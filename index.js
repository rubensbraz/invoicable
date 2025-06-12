var version = `Last modified: 2025/06/12 23:55:26
`;

// Generate invoice number
function generateInvoiceNumber() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}${day}-${randomNum}`;
}

// Add new invoice item
function addItem() {
    const tbody = document.querySelector('#invoice_items');
    const existingRows = tbody.querySelectorAll('.invoice-item');

    // Get values from the last row to copy
    let lastDescription = '';
    let lastQuantity = '1';
    let lastPrice = '';

    if (existingRows.length > 0) {
        const lastRow = existingRows[existingRows.length - 1];
        lastDescription = lastRow.querySelector('.item-description').value || '';
        lastQuantity = lastRow.querySelector('.item-quantity').value || '1';
        lastPrice = lastRow.querySelector('.item-price').value || '';
    }

    const newRow = document.createElement('tr');
    newRow.className = 'invoice-item';
    newRow.innerHTML = `
        <td><input type="text" class="form-control item-description" value="${lastDescription}" placeholder="Service/Product description" oninput="calculateRowTotal(this)"></td>
        <td><input type="number" class="form-control item-quantity" value="${lastQuantity}" min="0" oninput="calculateRowTotal(this)"></td>
        <td><input type="number" class="form-control item-price" value="${lastPrice}" placeholder="0" step="1" min="0" oninput="calculateRowTotal(this)"></td>
        <td class="item-amount">¥0</td>
        <td><button type="button" class="btn btn-sm btn-danger" onclick="removeItem(this)">×</button></td>
    `;
    tbody.appendChild(newRow);
    calculateRowTotal(newRow.querySelector('.item-description'));
}

// Remove invoice item
function removeItem(button) {
    const row = button.closest('tr');
    row.remove();
    calculateInvoiceTotal();
}

// Calculate row total
function calculateRowTotal(input) {
    const row = input.closest('tr');
    const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const amount = quantity * price;

    row.querySelector('.item-amount').textContent = `¥${amount.toLocaleString()}`;
    calculateInvoiceTotal();
}

// Calculate invoice total
function calculateInvoiceTotal() {
    const items = document.querySelectorAll('.invoice-item');
    let total = 0;

    items.forEach(item => {
        const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(item.querySelector('.item-price').value) || 0;
        total += quantity * price;
    });

    document.querySelector('#invoice_total').textContent = `¥${total.toLocaleString()}`;
}

function showShareLink() {
    // Collect data from editable fields and invoice items
    const items = [];
    const itemRows = document.querySelectorAll('.invoice-item');
    itemRows.forEach((row, index) => {
        const description = row.querySelector('.item-description').value;
        const quantity = row.querySelector('.item-quantity').value;
        const price = row.querySelector('.item-price').value;
        if (description || quantity || price) {
            items.push({
                description: description,
                quantity: quantity,
                price: price
            });
        }
    });

    const params = new URLSearchParams({
        bill_to_name: document.querySelector('#bill_to_name').textContent,
        bill_to_address: document.querySelector('#bill_to_address').textContent,
        bill_from_name: document.querySelector('#bill_from_name').textContent,
        bill_from_address: document.querySelector('#bill_from_address').textContent,
        bill_from_phone: document.querySelector('#bill_from_phone').textContent,
        bill_from_email: document.querySelector('#bill_from_email').textContent,
        bank_name: document.querySelector('#bank_name').textContent,
        branch_name: document.querySelector('#branch_name').textContent,
        account_type: document.querySelector('#account_type').textContent,
        account_number: document.querySelector('#account_number').textContent,
        account_holder: document.querySelector('#account_holder').textContent,
        items: JSON.stringify(items)
    });

    let link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    document.querySelector('#share_link').value = link;
    document.querySelector('#share_link').select();
    document.execCommand('copy');
}


window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#version').innerText = version;

    // Set today's date
    var today = new Date();
    document.querySelector('#date').innerHTML = today.toLocaleDateString('en-US');

    // Generate invoice number
    document.querySelector('#invoice_number').innerHTML = generateInvoiceNumber();

    // Load data from URL parameters
    let url = new URL(window.location.href);
    let params = url.searchParams;

    // Restore editable field values
    if (params.get('bill_to_name')) {
        document.querySelector('#bill_to_name').textContent = params.get('bill_to_name');
    }
    if (params.get('bill_to_address')) {
        document.querySelector('#bill_to_address').textContent = params.get('bill_to_address');
    }
    if (params.get('bill_from_name')) {
        document.querySelector('#bill_from_name').textContent = params.get('bill_from_name');
    }
    if (params.get('bill_from_address')) {
        document.querySelector('#bill_from_address').textContent = params.get('bill_from_address');
    }
    if (params.get('bill_from_phone')) {
        document.querySelector('#bill_from_phone').textContent = params.get('bill_from_phone');
    }
    if (params.get('bill_from_email')) {
        document.querySelector('#bill_from_email').textContent = params.get('bill_from_email');
    }
    if (params.get('bank_name')) {
        document.querySelector('#bank_name').textContent = params.get('bank_name');
    }
    if (params.get('branch_name')) {
        document.querySelector('#branch_name').textContent = params.get('branch_name');
    }
    if (params.get('account_type')) {
        document.querySelector('#account_type').textContent = params.get('account_type');
    }
    if (params.get('account_number')) {
        document.querySelector('#account_number').textContent = params.get('account_number');
    }
    if (params.get('account_holder')) {
        document.querySelector('#account_holder').textContent = params.get('account_holder');
    }

    // Restore items
    if (params.get('items')) {
        try {
            const items = JSON.parse(params.get('items'));
            const tbody = document.querySelector('#invoice_items');
            tbody.innerHTML = ''; // Clear existing items

            items.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.className = 'invoice-item';
                newRow.innerHTML = `
                    <td><input type="text" class="form-control item-description" value="${item.description}" placeholder="Service/Product description" oninput="calculateRowTotal(this)"></td>
                    <td><input type="number" class="form-control item-quantity" value="${item.quantity}" min="0" oninput="calculateRowTotal(this)"></td>
                    <td><input type="number" class="form-control item-price" value="${item.price}" placeholder="0" step="1" min="0" oninput="calculateRowTotal(this)"></td>
                    <td class="item-amount">¥0</td>
                    <td><button type="button" class="btn btn-sm btn-danger" onclick="removeItem(this)">×</button></td>
                `;
                tbody.appendChild(newRow);

                // Calculate the amount for this specific row after adding it
                calculateRowTotal(newRow.querySelector('.item-description'));
            });

            // Calculate totals for all restored items
            calculateInvoiceTotal();
        } catch (e) {
            console.error('Error parsing items:', e);
        }
    }

    // Initial calculation for any existing items - do this after a short delay to ensure DOM is ready
    setTimeout(() => {
        // Recalculate all row totals to ensure accuracy
        const allRows = document.querySelectorAll('.invoice-item');
        allRows.forEach(row => {
            calculateRowTotal(row.querySelector('.item-description'));
        });
        calculateInvoiceTotal();
    }, 100);
});

function buildElement(name_tag, innerHTML, str_class, str_style, element_appended) {
    let element = document.createElement(name_tag);
    if (innerHTML) element.innerHTML = innerHTML;
    if (str_class) element.classList = str_class;
    if (str_style) element.setAttribute('style', str_style);
    if (element_appended) element_appended.appendChild(element);
    return element;
}



function downloadPDF() {
    const element = document.querySelector('#pdf_element');
    const invoiceNumber = document.querySelector('#invoice_number').innerText;
    const billToName = document.querySelector('#bill_to_name').textContent || 'invoice';

    const option = {
        margin: 10,
        filename: `invoice_${invoiceNumber}_${billToName}.pdf`,
        html2canvas: {
            scale: window.devicePixelRatio * 2,
            useCORS: false,
            scrollY: 0,
        },
        jsPDF: { format: 'a4', orientation: 'portrait' },
        pagebreak: { avoid: ['li', 'h5'] },
    };

    html2pdf()
        .set(option)
        .from(element)
        .save()
        .then(() => {
            // Success
        })
        .catch((e) => {
            // Error
        });
}
