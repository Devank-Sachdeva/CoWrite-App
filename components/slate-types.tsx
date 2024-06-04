import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

type CustomElement = TitleElement | ParagraphElement
export type ParagraphElement = {
    type: 'paragraph'
    align?: string
    children: Descendant[]
}

export type TitleElement = { type: 'title'; children: Descendant[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
