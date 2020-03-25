// Link.react.test.js
import React from 'react'
import { DataTable } from './DataTable'
import renderer from 'react-test-renderer'

test('DataTable works when fields are simple strings', () => {
  const component = renderer.create(
    <DataTable columns={[{ name: 'Title', field: 'title' }]} items={[{ title: 'Test 1 - Item 1' }, { title: 'Test 1 - Item 2' }]} />
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('DataTable works when fields are a mix of strings and getter functions', () => {
  const component = renderer.create(
    <DataTable columns={[{ name: 'Title', field: (item) => { return item.title } }]} items={[{ title: 'Test 2 - Item 1' }, { title: 'Test 2 - Item 2' }]} />
  )

  expect(component.toJSON()).toMatchSnapshot()
})

// The below creates a warning, is there a way to prevent the warning?
// test('DataTable renders headers, but no items if no items are passed', () => {
//   const component = renderer.create(
//     <DataTable columns={[{ name: 'Title', field: (item) => { return item.title } }]} />
//   )

//   expect(component.toJSON()).toMatchSnapshot()
// })
