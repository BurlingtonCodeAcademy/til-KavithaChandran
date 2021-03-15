
//modal is displayed when the user presses the delete entry
// it has two options-1. cancel 2. confirm
function Modal(props) {

    function confirm() {
        props.setModal("hidden");
        fetch(`/delete/${props.id}`);
    }
    //model pop-up confirms once again if the entry needs to be deleted
    return (
        <div style={{ visibility: props.modal }} id="modalContainer">
            <div>
                <h1>Do you really want to delete the Entry?</h1>
                <div id="modalButtons">
                    {/*the two button which pops-up, confirms the delete and it deletes the entry */}
                    <button onClick={confirm}>Confirm</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
    // when you hit cancel, the model will be hidden again
    function cancel() {
        props.setModal("hidden");
    }
}
export default Modal;