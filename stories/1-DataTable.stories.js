import React from 'react'
import 'bulma/css/bulma.css'
import { DataTable } from '../src/DataTable/DataTable'
import { contentWrapped } from './contentWrapped'

export default {
  title: 'DataTable',
  component: DataTable
}

export const DataTableStory = () => (
  <div class="container">
    {
      contentWrapped(
        <>
          <h1>DataTable</h1>

          <p>Import:</p>
          <p><code>{`import { DataTable } from '@davidcraig/react'`}</code></p>

          <h2>Standard Example</h2>
          <p>The following is a standard use case of a navigation heirarchy with the current page being 'active'</p>
          <pre><code>{``}</code></pre>
        </>
      )
    }
  </div>
)

DataTableStory.story = {
  name: 'Standard Example'
}
