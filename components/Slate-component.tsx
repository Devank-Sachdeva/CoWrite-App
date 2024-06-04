"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import {
    Transforms,
    createEditor,
    Descendant,
} from 'slate'
import { useRecoilValue } from 'recoil'
import { socketAtom } from '@/store/socket'
import { withLayout } from './slate-layout'

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
            {
                text: 'This example shows how to enforce your layout with domain-specific constraints. This document will always have a title block at the top and at least one paragraph in the body. Try deleting them and see what happens!',
            },
        ],
    },
]

export const  Component = () => {
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
    const [data, setData] = useState<String>("");
    const socket = useRecoilValue(socketAtom);

    const editor = useMemo(
        () => withLayout(withReact(createEditor())),
        []
    )
    const appendToEditor =  useCallback((string: string) => {
        console.log("adding " + string)
        Transforms.insertText(editor, string);
    },[editor])
    
    useEffect(()=> {
        if (socket != null) socket.onmessage = (message) => appendToEditor(message.data)
    },[appendToEditor,socket])
    useEffect(()=> {
        if (socket?.readyState == WebSocket.OPEN){
            socket?.send(data != null ? data.toString() : "");
        }
    },[socket, data])


    return <Slate editor={editor} initialValue={initialValue} > 
        <Editable
            renderElement={renderElement}
            placeholder="Enter a title…"
            spellCheck
            autoFocus
            onDOMBeforeInput= {(event) => {
                setData(event.data!)
            }}

        />
    </Slate>

}

const Element = ({ attributes, children, element } : RenderElementProps) => {
    switch (element.type) {
        case 'title':
            return <div className='text-3xl pb-5' {...attributes}>{children}</div>
        case 'paragraph':
            return <p {...attributes}>{children}</p>
    }
}