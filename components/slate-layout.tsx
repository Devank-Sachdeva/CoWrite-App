import { Editor, Transforms, Element as SlateElement, Node } from "slate"
import { ParagraphElement, TitleElement } from "./slate-types"


type ElementType = "title" | "paragraph" | undefined

export const withLayout = (editor: Editor) => {
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
                const enforceType = (type: ElementType) => {
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