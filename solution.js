/** @typedef {import('./solution').RenderWaterfall} RenderWaterfall */

/** @type {(arr: number[]) => number} */
const findBestColumnIndex = (arr) => {
  let minIndex = 0;
  arr.forEach((item, index) => {
    if (item < arr[minIndex]) minIndex = index;
  });
  return minIndex;
};

/** @type {RenderWaterfall} */
function renderWaterfall(rootNode, columnCount = 3, gap = 20) {
    rootNode.style.display = 'flex';
    rootNode.style.justifyContent = 'space-between';

    const styleTag = document.createElement('style');
    const css = `
        .column :not(:last-child) {
            margin-bottom: ${gap}px;
        }
    `;

    styleTag.appendChild(document.createTextNode(css));
    document.body.appendChild(styleTag);

    const allGapsWidth = gap * (columnCount - 1);
    const columnWidth = (rootNode.offsetWidth - allGapsWidth) / columnCount;

    /** @type {HTMLDivElement[]} */
    const columnsElements = new Array(columnCount).fill().map(() => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.style.width = `${columnWidth}px`;
        rootNode.appendChild(columnElement);
        return columnElement;
    });

    // Чтобы не считать каждый раз высоту колоки, просто запоминаем
    const columnsHeight = new Array(columnCount).fill(0);

    while (rootNode.children.length) {
        // Ищем подходящую колонку
        const idx = findBestColumnIndex(columnsHeight);
        // Добавляем в неё объявление
        columnsElements[idx].appendChild(rootNode.children[0]);
        // И обновляем высоту
        columnsHeight[idx] = columnsElements[idx].offsetHeight;
    }
}
