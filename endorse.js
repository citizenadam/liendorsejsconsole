
// Run the script
expandAndEndorse();


// Function to click all "Endorse" buttons with a delay
async function clickEndorseButtons() {
    const endorseButtons = Array.from(document.querySelectorAll('button'))
        .filter(button => button.textContent.trim() === 'Endorse');
    
    if (endorseButtons.length > 0) {
        console.log(`Found ${endorseButtons.length} Endorse buttons`);
        for (let i = 0; i < endorseButtons.length; i++) {
            endorseButtons[i].click();
            console.log(`Clicked Endorse button ${i + 1} of ${endorseButtons.length}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
        }
        console.log("Finished clicking all Endorse buttons");
    } else {
        console.log("No Endorse buttons found");
    }
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
