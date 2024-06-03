"use client"

import { useCallback, useMemo, useState } from 'react'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import {
    BaseEditor,
    Transforms,
    createEditor,
    Node,
    Element as SlateElement,
    Descendant,
    Editor,
} from 'slate'
import { ReactEditor } from 'slate-react'


type CustomElement = TitleElement | ParagraphElement
type ParagraphElement = {
    type: 'paragraph'
    align?: string
    children: Descendant[]
}

type TitleElement = { type: 'title'; children: Descendant[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

type ElementType = "title" | "paragraph" | undefined

const initialValue: Descendant[] = [
    {
        type: 'title',
        children: [{ text: 'Enforce Your Layout!' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text: 'This example shows how to enforce your layout with domain-specific constraints. This document will always have a title block at the top and at least one paragraph in the body. Try deleting them and see what happens!',
            },
        ],
    },
]

export const  Component = () => {
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])

    const editor = useMemo(
        () => withLayout(withReact(createEditor())),
        []
    )
    return <Slate editor={editor} initialValue={initialValue} > 
        <Editable
            renderElement={renderElement}
            placeholder="Enter a title…"
            spellCheck
            autoFocus
        />
    </Slate>

}

const withLayout = (editor : Editor) => {
    const { normalizeNode } = editor
    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === '') {
                const title: TitleElement = {
                    type: 'title',
                    children: [{ text: 'Untitled' }],
                }
                Transforms.insertNodes(editor, title, {
                    at: path.concat(0),
                    select: true,
                })
            }

            if (editor.children.length < 2) {
                const paragraph: ParagraphElement = {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
            }
            
            for (const [child, childPath] of Node.children(editor, path)) {
                let type: ElementType
                const slateIndex = childPath[0]
                const enforceType = ( type : ElementType ) => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties: Partial<SlateElement> = { type }
                        Transforms.setNodes<SlateElement>(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }

                switch (slateIndex) {
                    case 0:
                        type = 'title'
                        enforceType(type as ElementType)
                        break
                    case 1:
                        type = 'paragraph'
                        enforceType(type as ElementType)
                    default:
                        break
                }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}


const Element = ({ attributes, children, element } : RenderElementProps) => {
    switch (element.type) {
        case 'title':
            return <div className='text-3xl focus:border-none' {...attributes}>{children}</div>
        case 'paragraph':
            return <p {...attributes}>{children}</p>
    }
}