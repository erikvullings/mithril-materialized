import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';

export interface FileUploadAttrs extends Attributes {
  /** Accept specific file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files (for multiple uploads) */
  maxFiles?: number;
  /** Callback when files are selected/dropped */
  onFilesSelected?: (files: File[]) => void;
  /** Callback for upload progress (if implementing upload) */
  onProgress?: (progress: number, file: File) => void;
  /** Callback when files are removed */
  onFileRemoved?: (file: File) => void;
  /** Disable the upload area */
  disabled?: boolean;
  /** Custom label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Show file preview for images */
  showPreview?: boolean;
  /** Custom class */
  className?: string;
  /** Validation error message */
  error?: string;
}

interface FileWithPreview extends File {
  preview?: string;
  uploadProgress?: number;
  uploadError?: string;
}

interface FileUploadState {
  id: string;
  files: FileWithPreview[];
  isDragOver: boolean;
  isUploading: boolean;
}

/**
 * File Upload Component with Drag and Drop
 * Supports multiple files, file type validation, size limits, and image preview
 */
export const FileUpload: FactoryComponent<FileUploadAttrs> = () => {
  let state: FileUploadState;

  const validateFile = (file: File, attrs: FileUploadAttrs): string | null => {
    // Check file size
    if (attrs.maxSize && file.size > attrs.maxSize) {
      const maxSizeMB = (attrs.maxSize / (1024 * 1024)).toFixed(1);
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    // Check file type
    if (attrs.accept) {
      const acceptedTypes = attrs.accept.split(',').map((type) => type.trim());
      const isAccepted = acceptedTypes.some((acceptedType) => {
        if (acceptedType.startsWith('.')) {
          // Extension check
          return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
        } else {
          // MIME type check
          return file.type.match(acceptedType.replace('*', '.*'));
        }
      });

      if (!isAccepted) {
        return `File type not accepted. Accepted: ${attrs.accept}`;
      }
    }

    return null;
  };

  const createFilePreview = (file: FileWithPreview): void => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        file.preview = e.target?.result as string;
        m.redraw();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFiles = (fileList: FileList, attrs: FileUploadAttrs): void => {
    const newFiles: FileWithPreview[] = Array.from(fileList);
    const validFiles: FileWithPreview[] = [];

    // Validate each file
    for (const file of newFiles) {
      const error = validateFile(file, attrs);
      if (error) {
        file.uploadError = error;
      } else {
        validFiles.push(file);
        if (attrs.showPreview) {
          createFilePreview(file);
        }
      }
    }

    // Check max files limit
    if (attrs.maxFiles) {
      const totalFiles = state.files.length + validFiles.length;
      if (totalFiles > attrs.maxFiles) {
        const allowedCount = attrs.maxFiles - state.files.length;
        validFiles.splice(allowedCount);
      }
    }

    // Add valid files to state
    if (attrs.multiple) {
      state.files = [...state.files, ...validFiles];
    } else {
      state.files = validFiles.slice(0, 1);
    }

    // Notify parent component
    if (attrs.onFilesSelected) {
      attrs.onFilesSelected(state.files.filter((f) => !f.uploadError));
    }
  };

  const removeFile = (fileToRemove: FileWithPreview, attrs: FileUploadAttrs): void => {
    state.files = state.files.filter((file) => file !== fileToRemove);

    if (attrs.onFileRemoved) {
      attrs.onFileRemoved(fileToRemove);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return {
    oninit: () => {
      state = {
        id: uniqueId(),
        files: [],
        isDragOver: false,
        isUploading: false,
      };
    },

    view: ({ attrs }) => {
      const {
        accept,
        multiple = false,
        disabled = false,
        label = 'Choose files or drag them here',
        helperText,
        showPreview = true,
        className = '',
        error,
      } = attrs;

      return m('.file-upload-container', { class: className }, [
        // Upload area
        m(
          '.file-upload-area',
          {
            class:
              [
                state.isDragOver ? 'drag-over' : '',
                disabled ? 'disabled' : '',
                error ? 'error' : '',
                state.files.length > 0 ? 'has-files' : '',
              ]
                .filter(Boolean)
                .join(' ') || undefined,
            ondragover: (e: DragEvent) => {
              if (disabled) return;
              e.preventDefault();
              e.stopPropagation();
              state.isDragOver = true;
            },
            ondragleave: (e: DragEvent) => {
              if (disabled) return;
              e.preventDefault();
              e.stopPropagation();
              state.isDragOver = false;
            },
            ondrop: (e: DragEvent) => {
              if (disabled) return;
              e.preventDefault();
              e.stopPropagation();
              state.isDragOver = false;

              if (e.dataTransfer?.files) {
                handleFiles(e.dataTransfer.files, attrs);
              }
            },
            onclick: () => {
              if (disabled) return;
              const input = document.getElementById(state.id) as HTMLInputElement;
              input?.click();
            },
          },
          [
            m('input[type="file"]', {
              id: state.id,
              accept,
              multiple,
              disabled,
              style: { display: 'none' },
              onchange: (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  handleFiles(target.files, attrs);
                }
              },
            }),

            m('.file-upload-content', [
              m('i.material-icons.file-upload-icon', 'cloud_upload'),
              m('p.file-upload-label', label),
              helperText && m('p.file-upload-helper', helperText),
              accept && m('p.file-upload-types', `Accepted: ${accept}`),
            ]),
          ]
        ),

        // Error message
        error && m('.file-upload-error', error),

        // File list
        state.files.length > 0 &&
          m('.file-upload-list', [
            m('h6', 'Selected Files:'),
            state.files.map((file) =>
              m('.file-upload-item', { key: file.name + file.size }, [
                // Preview thumbnail
                showPreview && file.preview && m('.file-preview', [m('img', { src: file.preview, alt: file.name })]),

                // File info
                m('.file-info', [
                  m('.file-name', file.name),
                  m('.file-details', [
                    m('span.file-size', formatFileSize(file.size)),
                    file.type && m('span.file-type', file.type),
                  ]),

                  // Progress bar (if uploading)
                  file.uploadProgress !== undefined &&
                    m('.file-progress', [
                      m('.progress', [
                        m('.determinate', {
                          style: { width: `${file.uploadProgress}%` },
                        }),
                      ]),
                    ]),

                  // Error message
                  file.uploadError && m('.file-error', file.uploadError),
                ]),

                // Remove button
                m(
                  'button.btn-flat.file-remove',
                  {
                    onclick: (e: Event) => {
                      e.stopPropagation();
                      removeFile(file, attrs);
                    },
                    title: 'Remove file',
                  },
                  [m('i.material-icons', 'close')]
                ),
              ])
            ),
          ]),
      ]);
    },
  };
};
