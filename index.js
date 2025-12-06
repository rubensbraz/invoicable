/**
 * Invoicable - Simple Invoice Generator
 * * @version 2.0.0
 * @author Tetsuaki Baba // Refactored by Rubens Braz
 */

const invoiceApp = (function () {
    // ==========================================================================
    // 1. CONFIGURATION & STATE
    // ==========================================================================

    const config = {
        defaultColor: "#2c3e50", // Matches CSS variable defaults
        defaultCurrency: "USD"
    };

    let state = {
        currency: config.defaultCurrency,
        lang: "en",
        dateFormat: "us"
    };

    // ==========================================================================
    // 2. DATA CONSTANTS
    // ==========================================================================

    // Currencies
    const currencies = [
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
        { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
        { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
        { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
        { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
        { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
        { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
        { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'ZAR', symbol: 'R', name: 'South African Rand' }
    ];

    // Localization Dictionary (i18n)
    const translations = {
        en: {
            invoice_title: "INVOICE",
            date_label: "Date:",
            invoice_number_label: "Invoice #",
            bill_to_title: "Bill To",
            from_title: "From",
            notes_title: "Notes",
            col_description: "Description",
            col_qty: "Qty",
            col_price: "Unit Price",
            col_amount: "Amount",
            total_label: "Total:",
            btn_add_item: "Add Item",
            payment_info_title: "Payment Details",
            bank_label: "Bank Name",
            branch_label: "Branch",
            account_type_label: "Acc. Type",
            account_number_label: "Acc. Number",
            account_holder_label: "Acc. Holder",
            btn_copy_link: "Copy Link",
            btn_link_copied: "Copied!",
            btn_download_pdf: "Download PDF",
            footer_privacy: "Data is saved locally in your browser. The author assumes no responsibility for any damage or loss caused by this system.",
            placeholders: {
                bill_to_name: "Client Name",
                bill_to_address: "Client Address",
                bill_from_name: "Your Name",
                bill_from_address: "Your Address",
                bill_from_phone: "Phone",
                bill_from_email: "Email",
                item_desc: "Description",
                bank_name: "Bank Name",
                branch_name: "Branch",
                account_type: "Checking",
                account_number: "000000",
                account_holder: "Name",
                invoice_notes: "Additional notes..."
            }
        },
        pt: {
            invoice_title: "FATURA",
            date_label: "Data:",
            invoice_number_label: "Fatura Nº",
            bill_to_title: "Para",
            from_title: "De",
            notes_title: "Obs.",
            col_description: "Descrição",
            col_qty: "Qtd",
            col_price: "Preço unitário",
            col_amount: "Valor",
            total_label: "Total:",
            btn_add_item: "Adicionar Item",
            payment_info_title: "Dados Bancários",
            bank_label: "Banco",
            branch_label: "Agência",
            account_type_label: "Tipo da Conta",
            account_number_label: "Número da Conta",
            account_holder_label: "Titular da Conta",
            btn_copy_link: "Copiar Link",
            btn_link_copied: "Copiado!",
            btn_download_pdf: "Baixar PDF",
            footer_privacy: "Os dados são salvos localmente no seu navegador. O autor não assume qualquer responsabilidade por danos ou perdas causados ​​por este sistema.",
            placeholders: {
                bill_to_name: "Nome Cliente",
                bill_to_address: "Endereço Cliente",
                bill_from_name: "Seu Nome",
                bill_from_address: "Seu Endereço",
                bill_from_phone: "Telefone",
                bill_from_email: "Email",
                item_desc: "Descrição",
                bank_name: "Banco",
                branch_name: "Agência",
                account_type: "Conta",
                account_number: "Número",
                account_holder: "Titular",
                invoice_notes: "Observações..."
            }
        },
        jp: {
            invoice_title: "請求書",
            date_label: "発行日:",
            invoice_number_label: "No.",
            bill_to_title: "請求先",
            from_title: "請求元",
            notes_title: "備考",
            col_description: "内容",
            col_qty: "数量",
            col_price: "単価",
            col_amount: "金額",
            total_label: "合計:",
            btn_add_item: "品目を追加",
            payment_info_title: "振込先",
            bank_label: "銀行名",
            branch_label: "支店名",
            account_type_label: "預金種別",
            account_number_label: "口座番号",
            account_holder_label: "口座名義",
            btn_copy_link: "リンク作成",
            btn_link_copied: "完了!",
            btn_download_pdf: "PDF保存",
            footer_privacy: "データはブラウザ内にローカルに保存されます。このシステムによって生じたいかなる損害または損失についても、作者は一切責任を負いません。",
            placeholders: {
                bill_to_name: "顧客名",
                bill_to_address: "住所",
                bill_from_name: "自社名",
                bill_from_address: "自社住所",
                bill_from_phone: "電話番号",
                bill_from_email: "メール",
                item_desc: "品目内容",
                bank_name: "銀行名",
                branch_name: "支店名",
                account_type: "種別",
                account_number: "番号",
                account_holder: "名義人",
                invoice_notes: "備考..."
            }
        }
    };

    // ==========================================================================
    // 3. INITIALIZATION
    // ==========================================================================

    /**
     * Initializes the application, sets up listeners, and loads data.
     */
    function init() {
        populateCurrencySelect();
        setupEventListeners();
        loadFromLocal(); // Persistence check

        // Handle URL parameters (overrides local storage if present)
        handleUrlParameters();

        // Sync UI Elements with State
        document.getElementById('languageSelect').value = state.lang;
        document.getElementById('currencySelect').value = state.currency;
        document.getElementById('dateFormatSelect').value = state.dateFormat;

        // Apply visual settings
        changeLanguage(state.lang);
        updateDateDisplay();

        // Ensure Invoice Number exists
        const invNumField = document.querySelector('#invoice_number');
        if (!invNumField.innerText.trim()) {
            invNumField.innerText = generateInvoiceNumber();
        }

        // Start Auto-save loop (every 2 seconds)
        setInterval(saveToLocal, 2000);
    }

    /**
     * Populates the currency dropdown from the sorted array.
     */
    function populateCurrencySelect() {
        const select = document.getElementById('currencySelect');
        select.innerHTML = '';
        currencies.forEach(curr => {
            const option = document.createElement('option');
            option.value = curr.code;
            option.text = `${curr.code} (${curr.symbol})`;
            select.appendChild(option);
        });
    }

    /**
     * Sets up all DOM event listeners.
     */
    function setupEventListeners() {
        document.getElementById('colorPicker').addEventListener('input', (e) => changeColor(e.target.value));
        document.getElementById('languageSelect').addEventListener('change', (e) => changeLanguage(e.target.value));
        document.getElementById('currencySelect').addEventListener('change', (e) => {
            state.currency = e.target.value;
            updateCurrencySymbols();
        });
        document.getElementById('dateFormatSelect').addEventListener('change', (e) => {
            state.dateFormat = e.target.value;
            updateDateDisplay();
        });
    }

    // ==========================================================================
    // 4. CORE LOGIC (Dates, Format, Calc)
    // ==========================================================================

    /**
     * Updates the date INPUT value.
     * Note: Inputs type='date' always require YYYY-MM-DD value.
     * The visual format (DD/MM or MM/DD) is controlled by the user's browser locale
     * until we generate the PDF.
     */
    function updateDateDisplay() {
        const dateInput = document.getElementById('date');

        // If the input already has a value (user selected), don't overwrite it automatically unless it's empty (initial load)
        if (!dateInput.value) {
            const today = new Date();
            // Local date to YYYY-MM-DD
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${year}-${month}-${day}`;
        }
    }

    /**
     * Generates a random Invoice ID.
     */
    function generateInvoiceNumber() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDay()).padStart(2, '0');
        const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${year}-${month}-${day}-${rand}`;
    }

    /**
     * Handles Language Switching and Placeholder updates.
     */
    function changeLanguage(langCode) {
        state.lang = langCode;
        if (!translations[langCode]) return;

        const t = translations[langCode];

        // Update static text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.innerText = t[key];
        });

        // Update placeholders mapping for contenteditable fields
        const mapping = {
            'bill_to_name': t.placeholders.bill_to_name,
            'bill_to_address': t.placeholders.bill_to_address,
            'bill_from_name': t.placeholders.bill_from_name,
            'bill_from_address': t.placeholders.bill_from_address,
            'bill_from_phone': t.placeholders.bill_from_phone,
            'bill_from_email': t.placeholders.bill_from_email,
            'bank_name': t.placeholders.bank_name,
            'branch_name': t.placeholders.branch_name,
            'account_type': t.placeholders.account_type,
            'account_number': t.placeholders.account_number,
            'account_holder': t.placeholders.account_holder,
            'invoice_notes': t.placeholders.invoice_notes
        };

        for (const [id, text] of Object.entries(mapping)) {
            const el = document.getElementById(id);
            if (el) el.setAttribute('data-placeholder', text);
        }

        // Update Table Input Placeholders
        document.querySelectorAll('.item-description').forEach(input => {
            input.placeholder = t.placeholders.item_desc;
        });
    }

    /**
     * Updates CSS variable for the theme color.
     */
    function changeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
    }

    /**
     * Gets symbol for current state currency.
     */
    function getSymbol() {
        const curr = currencies.find(c => c.code === state.currency);
        return curr ? curr.symbol : '$';
    }

    // ==========================================================================
    // 5. TABLE MANAGEMENT (Items, Rows, Totals)
    // ==========================================================================

    /**
     * Adds a new row to the invoice table.
     * @param {object} data - Optional data object to populate the row.
     */
    function addItem(data = null) {
        const tbody = document.querySelector('#invoice_items');
        let desc = '', qty = '1', price = '';

        if (data) {
            desc = data.description || '';
            qty = data.quantity || '1';
            price = data.price || '';
        } else {
            // Smart Copy: grab values from the last row for convenience
            const rows = tbody.querySelectorAll('.invoice-item');
            if (rows.length > 0) {
                const lastRow = rows[rows.length - 1];
                desc = lastRow.querySelector('.item-description').value;
                qty = lastRow.querySelector('.item-quantity').value;
                price = lastRow.querySelector('.item-price').value;
            }
        }

        const t = translations[state.lang] || translations['en'];
        const newRow = document.createElement('tr');
        newRow.className = 'invoice-item';

        // Structure with centered classes for Qty, Price, Amount, and Action
        newRow.innerHTML = `
            <td class="ps-2"><input type="text" class="form-control item-description" value="${desc}" placeholder="${t.placeholders.item_desc}" oninput="invoiceApp.calculateRowTotal(this)"></td>
            <td class="text-center"><input type="number" class="form-control item-quantity" value="${qty}" min="0" oninput="invoiceApp.calculateRowTotal(this)"></td>
            <td class="text-center"><input type="number" class="form-control item-price" value="${price}" placeholder="0" step="0.01" min="0" oninput="invoiceApp.calculateRowTotal(this)"></td>
            <td class="item-amount text-center">0</td>
            <td class="action-column text-center"><button type="button" class="btn btn-sm text-danger p-0" onclick="invoiceApp.removeItem(this)"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(newRow);
        calculateRowTotal(newRow.querySelector('.item-description'));
    }

    /**
     * Removes a row and recalculates total.
     */
    function removeItem(button) {
        button.closest('tr').remove();
        calculateInvoiceTotal();
        // Ensure at least one row remains
        if (document.querySelectorAll('.invoice-item').length === 0) addItem();
    }

    /**
     * Calculates the total for a single row.
     */
    function calculateRowTotal(input) {
        const row = input.closest('tr');
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const amount = quantity * price;
        const symbol = getSymbol();

        row.querySelector('.item-amount').textContent = `${symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        calculateInvoiceTotal();
    }

    /**
     * Calculates the grand total of the invoice.
     */
    function calculateInvoiceTotal() {
        const items = document.querySelectorAll('.invoice-item');
        let total = 0;
        items.forEach(item => {
            const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(item.querySelector('.item-price').value) || 0;
            total += quantity * price;
        });
        const symbol = getSymbol();
        document.querySelector('#invoice_total').textContent = `${symbol} ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    /**
     * Refreshes symbols when currency changes.
     */
    function updateCurrencySymbols() {
        document.querySelectorAll('.invoice-item').forEach(row => {
            calculateRowTotal(row.querySelector('.item-quantity'));
        });
    }

    // ==========================================================================
    // 6. PERSISTENCE (LocalStorage)
    // ==========================================================================

    function saveToLocal() {
        const data = collectInvoiceData();
        localStorage.setItem('invoiceData', JSON.stringify(data));
    }

    function loadFromLocal() {
        const raw = localStorage.getItem('invoiceData');
        if (raw) {
            try {
                const data = JSON.parse(raw);
                restoreData(data);
            } catch (e) {
                console.error("Failed to load local data", e);
                addItem();
            }
        } else {
            addItem();
        }
    }

    /**
     * Restores UI from a data object.
     */
    function restoreData(data) {
        if (data.lang) state.lang = data.lang;
        if (data.currency) state.currency = data.currency;
        if (data.dateFormat) state.dateFormat = data.dateFormat;
        if (data.color) {
            document.getElementById('colorPicker').value = data.color;
            changeColor(data.color);
        }

        const setTxt = (id, val) => { if (val) document.getElementById(id).innerText = val; };

        // Restore text fields
        ['invoice_number', 'bill_to_name', 'bill_to_address', 'bill_from_name',
            'bill_from_address', 'bill_from_phone', 'bill_from_email', 'bank_name',
            'branch_name', 'account_type', 'account_number', 'account_holder', 'invoice_notes']
            .forEach(id => setTxt(id, data[id]));

        // Restore Items
        document.querySelector('#invoice_items').innerHTML = '';
        if (data.items_array && data.items_array.length > 0) {
            data.items_array.forEach(item => addItem(item));
        } else {
            addItem();
        }
    }

    // ==========================================================================
    // 7. EXPORT & SHARE
    // ==========================================================================

    /**
     * Collects all current invoice data into an object.
     */
    function collectInvoiceData() {
        const items = [];
        document.querySelectorAll('.invoice-item').forEach(row => {
            items.push({
                description: row.querySelector('.item-description').value,
                quantity: row.querySelector('.item-quantity').value,
                price: row.querySelector('.item-price').value
            });
        });

        const getTxt = (id) => document.getElementById(id).innerText;

        return {
            invoice_number: getTxt('invoice_number'),
            bill_to_name: getTxt('bill_to_name'),
            bill_to_address: getTxt('bill_to_address'),
            bill_from_name: getTxt('bill_from_name'),
            bill_from_address: getTxt('bill_from_address'),
            bill_from_phone: getTxt('bill_from_phone'),
            bill_from_email: getTxt('bill_from_email'),
            bank_name: getTxt('bank_name'),
            branch_name: getTxt('branch_name'),
            account_type: getTxt('account_type'),
            account_number: getTxt('account_number'),
            account_holder: getTxt('account_holder'),
            invoice_notes: getTxt('invoice_notes'),
            items_array: items,
            items: JSON.stringify(items), // Legacy URL support
            lang: state.lang,
            currency: state.currency,
            dateFormat: state.dateFormat,
            color: document.getElementById('colorPicker').value
        };
    }

    function copyShareLink() {
        saveToLocal();
        const data = collectInvoiceData();
        // Remove items_array from URL to keep it slightly cleaner
        const { items_array, ...urlData } = data;
        const params = new URLSearchParams(urlData);
        const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        navigator.clipboard.writeText(link).then(() => {
            const btn = document.getElementById('btn_copy_link');
            const originalContent = btn.innerHTML;
            const t = translations[state.lang] || translations['en'];

            btn.classList.remove('btn-dark');
            btn.classList.add('btn-success');
            btn.innerHTML = `<i class="bi bi-check-lg"></i> ${t.btn_link_copied}`;
            document.getElementById('share_link').value = link;

            setTimeout(() => {
                btn.classList.remove('btn-success');
                btn.classList.add('btn-dark');
                btn.innerHTML = originalContent;
            }, 2000);
        });
    }

    function handleUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        if (!params.has('invoice_number')) return;

        const data = {};
        for (const [key, value] of params.entries()) {
            data[key] = value;
        }

        if (params.get('items')) {
            try {
                data.items_array = JSON.parse(params.get('items'));
            } catch (e) { }
        }

        restoreData(data);
    }

    /**
     * Generates and downloads the PDF using html2pdf.js.
     */
    function downloadPDF() {
        const element = document.querySelector('#pdf_element');
        const opt = {
            margin: [5, 5, 5, 5],
            filename: `invoice_${document.querySelector('#invoice_number').innerText}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Clone DOM to clean up for print without affecting UI
        const clone = element.cloneNode(true);

        // Remove UI elements
        clone.querySelectorAll('.action-column').forEach(el => el.remove());
        clone.querySelectorAll('.no-print').forEach(el => el.remove());

        // Ensure table takes full width
        const table = clone.querySelector('table');
        if (table) {
            table.style.width = '100%';
        }

        // Expand the Description column to fill the 5% gap left by the Action column
        // (Original: 45% -> New: 50%)
        const descHeader = clone.querySelector('th[data-i18n="col_description"]');
        if (descHeader) {
            descHeader.setAttribute('width', '50%');
        }

        // Handle Inputs (Convert to Text)
        clone.querySelectorAll('input').forEach(input => {
            const span = document.createElement('span');
            span.className = input.className;
            span.style.border = "none";
            span.style.padding = "0";

            // Handling for date
            if (input.type === 'date') {
                // Get the raw YYYY-MM-DD value
                const rawDate = input.value;
                let formattedDate = rawDate;

                if (rawDate) {
                    const [y, m, d] = rawDate.split('-');
                    // Format based on selected preference
                    if (state.dateFormat === 'jp') {
                        formattedDate = `${y}-${m}-${d}`;
                    } else if (state.dateFormat === 'us') {
                        formattedDate = `${m}/${d}/${y}`;
                    } else if (state.dateFormat === 'br') {
                        formattedDate = `${d}/${m}/${y}`;
                    }
                }
                span.innerText = formattedDate;
                span.style.textAlign = "right";
            } else {
                // Standard text inputs
                span.innerText = input.value;
                span.style.textAlign = input.style.textAlign || "center";
                if (input.classList.contains('item-description')) span.style.textAlign = "left";
            }

            input.parentNode.replaceChild(span, input);
        });

        clone.style.backgroundColor = "#ffffff";
        clone.style.padding = "20px";

        html2pdf().set(opt).from(clone).save();
    }

    // Public API
    return { init, addItem, removeItem, calculateRowTotal, copyShareLink, downloadPDF };
})();

// Start App
window.addEventListener('DOMContentLoaded', invoiceApp.init);