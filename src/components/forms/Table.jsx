import React from 'react';
import styles from './Table.module.scss';

const Table = ({
  columns,
  data,
  onRowClick,
  emptyMessage = '沒有數據',
  className = ''
}) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.headerCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? styles.clickableRow : ''}
              >
                {columns.map((column) => (
                  <td key={column.key} className={styles.cell}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 