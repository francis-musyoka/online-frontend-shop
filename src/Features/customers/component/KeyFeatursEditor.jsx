import React from 'react';
import { Editor, EditorState, convertFromRaw } from "draft-js";

const KeyFeaturesDisplay = ({keyFeatures}) => {


    const contentState = convertFromRaw(JSON.parse(keyFeatures));
    const editorState = EditorState.createWithContent(contentState);
    return (
        <div>
            <Editor editorState={editorState} readOnly={true} className="mt-0"/>
        </div>
    );
}

export default KeyFeaturesDisplay;