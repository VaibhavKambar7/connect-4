
export const groupHighlight = (group, className) => {
    // Add a mouseover event listener to each element
    group.forEach(element => {
        element.addEventListener('mouseover', () => {
            // Add the 'highlighted' class to all within the same group
            group.forEach(item => {
                item.classList.add(className);
            });
        });

        // Add a mouseout event listener to each element to remove the highlight
        element.addEventListener('mouseout', () => {
            group.forEach(item => {
                item.classList.remove(className);
            });
        });
    });
}