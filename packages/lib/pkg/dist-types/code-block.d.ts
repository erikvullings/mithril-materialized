import './styles/codeblock.css';
import { FactoryComponent, Attributes } from 'mithril';
export interface ICodeBlock extends Attributes {
    language?: string;
    code: string | string[];
    newRow?: boolean;
}
/** A simple code block without syntax high-lighting */
export declare const CodeBlock: FactoryComponent<ICodeBlock>;
