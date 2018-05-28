import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'

import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'

import { block, readAsBase64 } from '../utils'

const stateFromValue = value => {
  if (!value) {
    return EditorState.createEmpty()
  }
  const contentBlock = htmlToDraft(value)
  const editorContent = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentBlock.contentBlocks)
  )
  return editorContent
}

export const stateToValue = editorState =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()))

const normalize = value =>
  value === '<p></p>\n' ? '' : value ? value.trim() : ''

@block
export default class HTMLField extends React.Component {
  static getDerivedStateFromProps(
    {
      elementRef: { current },
      value,
    },
    { value: oldValue }
  ) {
    if (value !== oldValue) {
      value = normalize(value)
      current && (current.value = value)
      return {
        editorState: stateFromValue(value),
        value,
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      editorState: null,
      value: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(editorState) {
    const {
      elementRef: { current },
      onChange,
    } = this.props
    const value = normalize(stateToValue(editorState))
    // Synchronise value with input for html5 form validation
    current.value = value
    this.setState({ editorState, value })
    onChange(value)
  }

  handleFocus(e) {
    const { onFocus } = this.props
    onFocus(e)
  }

  handleBlur(e) {
    const { onBlur } = this.props
    onBlur(e)
  }

  render(b) {
    const {
      className,
      elementRef,
      i18n,
      readOnly,
      value,
      disabled,
      onFocus,
      onBlur,
      onKeyDown,
      toolbar,
      placeholder,
      type,
      onChange,
      ...props
    } = this.props
    const { editorState } = this.state
    const HTMLToolbar = toolbar || {
      image: {
        uploadCallback: async file => ({
          data: { link: await readAsBase64(file) },
        }),
        previewImage: true,
        alt: { present: true, mandatory: false },
      },
    }
    return (
      <div className={b.mix(className)}>
        <Editor
          editorClassName={b.e('editor')}
          editorState={editorState}
          localization={{
            locale: 'fr',
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onEditorStateChange={this.handleChange}
          handleReturn={onKeyDown}
          placeholder={placeholder || i18n.html.placeholder}
          readOnly={readOnly || disabled}
          toolbar={HTMLToolbar}
          toolbarClassName={b.e('toolbar')}
          wrapperClassName={b.e('wrapper')}
        />
        <input
          className={b.e('hidden-input')}
          ref={elementRef}
          {...props}
          defaultValue={value}
          type="text"
        />
      </div>
    )
  }
}
