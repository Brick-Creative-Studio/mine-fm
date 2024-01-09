import React, { ReactElement } from 'react'

interface Props {
  url: string
  text: string
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>
}

export default function TwitterShare(props: Props) {
  /*----------------------
  Twitter Share
  ----------------------*/
  function twitterShare(e: MouseEvent) {
    e.preventDefault()

    // Encode the share text.
    const encodedText = encodeURIComponent(props.text)

    // Open the twitter share dialog.
    window.open(
      `http://twitter.com/share?url=${props.url}&text=${encodedText}`,
      'twitter_window',
      `height=450, width=550, top=${window.innerHeight / 2 - 225}, left=${
        window.innerWidth / 2
      }, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
    )
  }

  /*----------------------
  Template
  ----------------------*/
  return React.cloneElement(
    props.children,
    {
      ...props,
      onClick: twitterShare,
    },
    (props.children as ReactElement).props.children
  )
}
