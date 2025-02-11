// let formElements = [
//     {
//         "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
//         "type": "input",
//         "label": "Sample Input",
//         "placeholder": "Sample placeholder"
//     },
//     {
//         "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
//         "type": "select",
//         "label": "Sample Select",
//         "options": ["Sample Option", "Sample Option", "Sample Option"]
//     },
//     {
//         "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
//         "type": "textarea",
//         "label": "Sample Textarea",
//         "placeholder": "Sample Placeholder"
//     },
//     {
//         "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
//         "type": "checkbox",
//         "label": "Sample Checkbox",
//     },
// ];

// let mainContainer = document.getElementById('main-container');

// function renderFormElements() {
//     mainContainer.innerHTML = '';

//     formElements.map((ele, idx) => {
//         let elementDiv = document.createElement('div');

//         if (ele.type == 'input') {
//             elementDiv.innerHTML = `<label for="input">${ele.label}:</label>
//             <input type='text' placeholder="${ele.placeholder}">
//             <button onclick="removeElement(${idx})">Delete</button>`;
//         } else if (ele.type === 'select') {
//             elementDiv.innerHTML = `<label for="select">${ele.label}:</label>
//             <select>
//                 ${ele.options.map(option => `<option value="${option}">${option}</option>`).join('')}
//             </select>
//             <button onclick="removeElement(${idx})">Delete</button>`;
//         } else if (ele.type === 'textarea') {
//             elementDiv.innerHTML = `<label for="textarea">${ele.label}:</label>
//             <textarea placeholder="${ele.placeholder}"></textarea>
//             <button onclick="removeElement(${idx})">Delete</button>`;
//         } else if (ele.type === 'checkbox') {
//             elementDiv.innerHTML = `<label for="checkbox">${ele.label}:</label>
//             <input type='checkbox'>
//             <button onclick="removeElement(${idx})">Delete</button>`;
//         }

//         mainContainer.appendChild(elementDiv);
//     });
// }

// function removeElement(idx) {
//     formElements.splice(idx, 1);
//     renderFormElements();
// }

// let inputAddButton = document.getElementById('input-add-btn');
// let selectAddButton = document.getElementById('select-add-btn');
// let textareaAddButton = document.getElementById('textarea-add-btn');
// let checkboxAddButton = document.getElementById('checkbox-add-btn');

// inputAddButton.addEventListener('click', function() {
//     let uuid = self.crypto.randomUUID();
//     let newInputElement = {
//         "id": uuid,
//         "type": "input",
//         "label": "Added Input",
//         "placeholder": "Added placeholder"
//     };
//     formElements.push(newInputElement);
//     renderFormElements();
// });

// selectAddButton.addEventListener('click', function() {
//     let uuid = self.crypto.randomUUID();
//     let newSelectElement = {
//         "id": uuid,
//         "type": "select",
//         "label": "Added Select",
//         "options": ["Sample Option", "Sample Option", "Sample Option"]
//     };
//     formElements.push(newSelectElement);
//     renderFormElements();
// });

// textareaAddButton.addEventListener('click', function() {
//     let uuid = self.crypto.randomUUID();
//     let newTextareaElement = {
//         "id": uuid,
//         "type": "textarea",
//         "label": "Added Textarea",
//         "placeholder": "Sample Placeholder"
//     };
//     formElements.push(newTextareaElement);
//     renderFormElements();
// });

// checkboxAddButton.addEventListener('click', function() {
//     let uuid = self.crypto.randomUUID();
//     let newCheckboxElement = {
//         "id": uuid,
//         "type": "checkbox",
//         "label": "Added Checkbox"
//     };
//     formElements.push(newCheckboxElement);
//     renderFormElements();
// });

// renderFormElements();

// console.log(formElements);
let formElements = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Input",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Select",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "textarea",
        "label": "Sample Textarea",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "checkbox",
        "label": "Sample Checkbox",
    },
];

let mainContainer = document.getElementById('main-container');

function renderFormElements() {
    mainContainer.innerHTML = '';

    formElements.forEach((ele, idx) => {
        let elementDiv = document.createElement('div');
        elementDiv.classList.add('draggable');
        elementDiv.setAttribute('draggable', true);
        elementDiv.setAttribute('data-index', idx);

        if (ele.type === 'input') {
            elementDiv.innerHTML = `
                <label>${ele.label}:</label>
                <input type='text' placeholder="${ele.placeholder}">
                <button onclick="removeElement(${idx})">Delete</button>
            `;
        } else if (ele.type === 'select') {
            elementDiv.innerHTML = `
                <label>${ele.label}:</label>
                <select>
                    ${ele.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
                <button onclick="removeElement(${idx})">Delete</button>
            `;
        } else if (ele.type === 'textarea') {
            elementDiv.innerHTML = `
                <label>${ele.label}:</label>
                <textarea placeholder="${ele.placeholder}"></textarea>
                <button onclick="removeElement(${idx})">Delete</button>
            `;
        } else if (ele.type === 'checkbox') {
            elementDiv.innerHTML = `
                <label>${ele.label}:</label>
                <input type='checkbox'>
                <button onclick="removeElement(${idx})">Delete</button>
            `;
        }

        // Drag Events
        elementDiv.addEventListener('dragstart', dragStart);
        elementDiv.addEventListener('dragover', dragOver);
        elementDiv.addEventListener('drop', drop);
        elementDiv.addEventListener('dragend', dragEnd);

        mainContainer.appendChild(elementDiv);
    });
}

// Drag and Drop Functions
let draggedElementIndex = null;

function dragStart(e) {
    draggedElementIndex = e.target.getAttribute('data-index');
    e.target.classList.add('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const targetIndex = e.target.closest('.draggable').getAttribute('data-index');

    if (draggedElementIndex !== null && targetIndex !== null) {
        const temp = formElements[draggedElementIndex];
        formElements.splice(draggedElementIndex, 1);
        formElements.splice(targetIndex, 0, temp);
        renderFormElements();
    }
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function removeElement(idx) {
    formElements.splice(idx, 1);
    renderFormElements();
}


document.getElementById('input-add-btn').addEventListener('click', () => addElement('input', "Added Input", "Added placeholder"));
document.getElementById('select-add-btn').addEventListener('click', () => addElement('select', "Added Select", ["Sample Option", "Sample Option", "Sample Option"]));
document.getElementById('textarea-add-btn').addEventListener('click', () => addElement('textarea', "Added Textarea", "Sample Placeholder"));
document.getElementById('checkbox-add-btn').addEventListener('click', () => addElement('checkbox', "Added Checkbox"));

function addElement(type, label, placeholderOrOptions) {
    let uuid = self.crypto.randomUUID();
    let newElement = { id: uuid, type, label };

    if (type === 'select') {
        newElement.options = placeholderOrOptions;
    } else if (type === 'input' || type === 'textarea') {
        newElement.placeholder = placeholderOrOptions;
    }

    formElements.push(newElement);
    renderFormElements();
}

renderFormElements();
