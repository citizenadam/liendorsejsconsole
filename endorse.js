// Function to click all "Endorse" buttons with a delay
async function clickEndorseButtons() {
    let endorsedCount = 0;
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
        const endorseButtons = Array.from(document.querySelectorAll('button'))
            .filter(button => button.textContent.trim() === 'Endorse');
        
        if (endorseButtons.length > 0) {
            console.log(`Found ${endorseButtons.length} Endorse buttons`);
            const button = endorseButtons[0]; // Focus on the first button
            try {
                await scrollIntoViewIfNeeded(button);
                if (await clickButtonEffectively(button, endorsedCount + 1)) {
                    endorsedCount++;
                    retries = 0; // Reset retries on successful click
                    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for page update
                } else {
                    retries++;
                }
            } catch (error) {
                console.error(`Error processing button ${endorsedCount + 1}: ${error.message}`);
                retries++;
            }
        } else {
            console.log("No more Endorse buttons found");
            break;
        }
    }
    console.log(`Finished processing. Endorsed ${endorsedCount} skills.`);
}

// Function to ensure a button click is effective
async function clickButtonEffectively(button, index) {
    const initialState = button.textContent.trim();
    console.log(`Attempting to click Endorse button ${index}`);
    
    // Try different click methods
    button.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (button.textContent.trim() !== initialState) {
        console.log(`Button ${index} clicked successfully`);
        return true;
    }
    
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (button.textContent.trim() !== initialState) {
        console.log(`Button ${index} clicked successfully with MouseEvent`);
        return true;
    }
    
    // If clicks don't work, try to trigger the button's onclick event
    const clickEvent = button.onclick;
    if (clickEvent) {
        clickEvent.call(button);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (button.textContent.trim() !== initialState) {
            console.log(`Button ${index} clicked successfully by triggering onclick`);
            return true;
        }
    }
    
    console.log(`Unable to effectively click button ${index}`);
    return false;
}

// Function to scroll an element into view if needed
async function scrollIntoViewIfNeeded(element) {
    if (!isInViewport(element)) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll to complete
    }
}

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to expand skills section and then click Endorse buttons
async function expandAndEndorse() {
    const showMoreButton = document.querySelector("button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary");
    if (showMoreButton) {
        showMoreButton.click();
        console.log("Show more button clicked");
        // Wait 2 seconds for the page to update before clicking Endorse buttons
        await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
        console.log("Show more button not found, proceeding to click Endorse buttons");
    }
    await clickEndorseButtons();
}

// Run the script
expandAndEndorse();
