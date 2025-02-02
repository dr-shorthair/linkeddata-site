import React from 'react'

export default function ExternalLink({href, children}) {
    if(!children) {
        return <></>
    }
    return (
        <a target="_blank" href={href}>{children}<svg width="10" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>
    )
}