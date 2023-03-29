/** @typedef {import('./solution').RenderWaterfall} RenderWaterfall */

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
}
