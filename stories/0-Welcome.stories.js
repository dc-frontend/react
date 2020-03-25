import React from 'react'
import { Welcome } from '@storybook/react/demo'
import 'bulma/css/bulma.css'

export default {
  title: 'React',
  component: Welcome
}

export const Installation = () => (
  <div class="container">
    <div class="content">
      <h1>React Components</h1>

      <h2>Installation</h2>
      <pre><code>npm install @dcraig/react</code></pre>
    </div>
  </div>
)

Installation.story = {
  name: 'Installation'
}
