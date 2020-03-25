import React from 'react'
import PropTypes from 'prop-types'

/**
 * This component creates a tabular view of a data set given some items and optional columns
 */
export class DataTable extends React.Component {
  getColumns () {
    let cols = this.props.columns
    if (!cols) {
      // If we dont have explicit columns, try to be implicit.
      cols = this.getImplicitColumns()
    }
    return cols
  }

  getImplicitColumns () {
    const columns = {}
    if (typeof this.props.items !== 'undefined') {
      this.props.items.map(i => {
        Object.keys(i).map(col => {
          if (typeof columns[col] === 'undefined') {
            columns[col] = {
              field: col,
              name: col
            }
          }
        })
      })
    }

    const columnArray = []
    Object.keys(columns).map(col => {
      columnArray.push(columns[col])
    })

    return columnArray
  }

  renderColumnHeadings () {
    const cols = this.getColumns()

    return <tr key='headings'>{cols.map(c => {
      return <th key={c.field}>{c.name}</th>
    })}</tr>
  }

  getFieldKey (item, column) {
    return item.name + column.field
  }

  renderField (item, column) {
    const key = this.getFieldKey(item, column)
    if (typeof column.field === 'function') {
      return <td key={key}>{column.field(item)}</td>
    }

    return <td key={key}>{item[column.field]}</td>
  }

  renderData () {
    const items = this.props.items
    const columns = this.getColumns()
    if (!items || !columns) {
      return ''
    }

    return items.map(i => {
      let cssClass = ''
      if (typeof i.className !== 'undefined') {
        cssClass = i.className
      }

      return <tr key={i.name} className={cssClass}>
        {
          columns.map(c => {
            return this.renderField(i, c)
          })
        }
      </tr>
    })
  }

  tableClasses () {
    const classNames = ['table']
    if (typeof this.props.classes !== 'undefined') {
      this.props.classes.map(c => {
        classNames.push(c)
      })
    }
    return classNames.join(' ')
  }

  render () {
    const headings = this.renderColumnHeadings()
    const data = this.renderData()
    const tClass = this.tableClasses()

    return (
      <table className={tClass}>
        <thead>{headings}</thead>
        <tbody>{data}</tbody>
      </table>
    )
  }
}

DataTable.propTypes = {
  /**
   * An array of columns (objects) with the following properties:
   *
   * - name: 'The display name of the column'
   * - field: Either the key of a property on item to return or a function returning the value
   */
  columns: PropTypes.array,
  /**
   * An array of data items to be shown in the table
   */
  items: PropTypes.array.isRequired,
  /**
   * Allows css classes to be passed in to be used in the component.
   */
  classes: PropTypes.array,
  /**
   * Primary key, required for looping through each object (sets react's `key`).
   */
  primaryKey: PropTypes.string
}
DataTable.defaultProps = {
  primaryKey: 'id'
}

export default DataTable
