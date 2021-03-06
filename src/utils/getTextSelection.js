//https://github.com/facebook/draft-js/issues/442#issuecomment-223816158
//TODO: Maybe follow the next comment (on the above) and use getContentStateFragment function!

export default (contentState, selection, blockDelimiter) => {
    blockDelimiter = blockDelimiter || "\n";
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    var blocks = contentState.getBlockMap();
    let blockKey ='';

    var lastWasEnd = false;
    var selectedBlock = blocks
        .skipUntil(function (block) {
            return block.getKey() === startKey;
        })
        .takeUntil(function (block) {
            var result = lastWasEnd;

            if (block.getKey() === endKey) {
                lastWasEnd = true;
            }

            return result;
        });
    //Don't allow linking across multiple blocks
    if (selectedBlock.length > 1) return "INVALID";
    const text = selectedBlock
        .map(function (block) {
            var key = block.getKey();
            var text = block.getText();

            let start = 0;
            let end = text.length;

            if (key === startKey) {
                start = selection.getStartOffset();
            }
            if (key === endKey) {
                end = selection.getEndOffset();
            }
            text = text.slice(start, end);
            blockKey=key;
            return text;
        })
        .join(blockDelimiter);
    let sIndex = selection.getStartOffset();
    let eIndex = selection.getEndOffset();
    if (selection.isBackward) {
        eIndex = selection.getEndOffset();
        sIndex = selection.getStartOffset();
    }
    return selection.getStartOffset() !== selection.getEndOffset()
        ? { text: text, startIndex: sIndex, endIndex: eIndex, blockKey, isBackward:selection.isBackward}
        : null;
};
