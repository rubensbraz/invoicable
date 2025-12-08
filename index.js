/**
 * Invoicable - Simple Invoice Generator
 * * @version 2.2.0
 * @author Tetsuaki Baba and Rubens Braz
 */

const invoiceApp = (function () {
    // ==========================================================================
    // 1. CONFIGURATION & STATE
    // ==========================================================================

    const config = {
        defaultColor: "#001c9a",
        defaultCurrency: "USD"
    };

    let state = {
        currency: config.defaultCurrency,
        lang: "en",
        dateFormat: "us",
        timeFormat: "24h"
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
            time_label: "Time:",
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
            btn_clear: "Clear all inputs",
            confirm_clear: "Are you sure you want to clear all data? This action cannot be undone.",
            pdf_recreate_link: "Click here to recreate this invoice.",
            footer_privacy: "Data is saved locally in your browser. The author assumes no responsibility for any damage or loss caused by this system.",
            placeholders: {
                bill_to_name: "Name",
                bill_to_address: "Address",
                bill_to_phone: "Phone",
                bill_to_email: "Email",
                bill_from_name: "Name",
                bill_from_address: "Address",
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
            time_label: "Hora:",
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
            btn_clear: "Limpar tudo",
            confirm_clear: "Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.",
            pdf_recreate_link: "Clique aqui para recriar essa fatura.",
            footer_privacy: "Os dados são salvos localmente no seu navegador. O autor não assume qualquer responsabilidade por danos ou perdas causados ​​por este sistema.",
            placeholders: {
                bill_to_name: "Nome",
                bill_to_address: "Endereço",
                bill_to_phone: "Telefone",
                bill_to_email: "Email",
                bill_from_name: "Nome",
                bill_from_address: "Endereço",
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
            time_label: "時間:",
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
            btn_clear: "すべて消去",
            confirm_clear: "すべてのデータを消去してもよろしいですか？この操作は取り消せません。",
            pdf_recreate_link: "この請求書を再発行するリンク。",
            footer_privacy: "データはブラウザ内にローカルに保存されます。このシステムによって生じたいかなる損害または損失についても、作者は一切責任を負いません。",
            placeholders: {
                bill_to_name: "顧客名",
                bill_to_address: "住所",
                bill_to_phone: "電話番号",
                bill_to_email: "メール",
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
        
        // PRIORITY: Handle URL parameters first
        // If data is found in URL, we use it and SKIP LocalStorage to ensure the link is the source of truth
        const loadedFromUrl = handleUrlParameters();
        // FALLBACK: Only load from LocalStorage if no URL data was present
        if (!loadedFromUrl) {
            loadFromLocal();
        }

        // Sync UI Elements with State
        document.getElementById('languageSelect').value = state.lang;
        document.getElementById('currencySelect').value = state.currency;
        document.getElementById('dateFormatSelect').value = state.dateFormat;
        document.getElementById('timeFormatSelect').value = state.timeFormat;

        // Apply visual settings
        changeLanguage(state.lang);
        updateDateDisplay();
        updateTimeDisplay();

        // Ensure Invoice Number exists
        const invNumField = document.querySelector('#invoice_number');
        if (!invNumField.innerText.trim()) {
            invNumField.innerText = generateInvoiceNumber();
        }

        // Start Auto-save loop (every 5 seconds)
        setInterval(() => {
            saveToLocal();
            updateLiveUrl();
        }, 5000);
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

        document.getElementById('timeFormatSelect').addEventListener('change', (e) => {
            state.timeFormat = e.target.value;
            updateTimeDisplay();
        });

        // Prevents pasting HTML formatting into editable fields
        document.querySelectorAll('[contenteditable]').forEach(el => {
            el.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.originalEvent || e).clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
            });
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
     * Updates the time INPUT value.
     */
    function updateTimeDisplay() {
        const timeInput = document.getElementById('time');
        if (!timeInput.value) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            timeInput.value = `${hours}:${mins}`;
        }
    }

    /**
     * Generates a random Invoice ID.
     * @returns {string} The formatted invoice number.
     */
    function generateInvoiceNumber() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${year}-${month}-${day}-${rand}`;
    }

    /**
     * Handles Language Switching and Placeholder updates.
     * @param {string} langCode - The language code (en, pt, jp).
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
            'bill_to_phone': t.placeholders.bill_to_phone,
            'bill_to_email': t.placeholders.bill_to_email,
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
     * @param {string} color - Hex color code.
     */
    function changeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
    }

    /**
     * Gets symbol for current state currency.
     * @returns {string} Currency symbol.
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

        newRow.innerHTML = `
            <td class="ps-2">
                <input type="text" class="form-control item-description" value="${desc}" placeholder="${t.placeholders.item_desc}" oninput="invoiceApp.calculateRowTotal(this)">
            </td>
            <td class="text-center">
                <input type="number" class="form-control item-quantity" value="${qty}" min="0" oninput="invoiceApp.calculateRowTotal(this)">
            </td>
            <td class="text-center">
                <input type="number" class="form-control item-price" value="${price}" placeholder="0" step="0.01" min="0" oninput="invoiceApp.calculateRowTotal(this)">
            </td>
            <td class="item-amount text-center">0</td>
            <td class="action-column text-center">
                <button type="button" class="btn btn-sm text-danger p-0" onclick="invoiceApp.removeItem(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(newRow);
        calculateRowTotal(newRow.querySelector('.item-description'));
    }

    /**
     * Removes a row and recalculates total.
     * @param {HTMLElement} button - The button element clicked.
     */
    function removeItem(button) {
        button.closest('tr').remove();
        calculateInvoiceTotal();
        // Ensure at least one row remains
        if (document.querySelectorAll('.invoice-item').length === 0) addItem();
    }

    /**
     * Calculates the total for a single row.
     * @param {HTMLElement} input - Any input element within the row.
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
        document.getElementById('invoice_total').textContent = `${symbol} ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    /**
     * Refreshes symbols in the table when currency changes.
     */
    function updateCurrencySymbols() {
        document.querySelectorAll('.invoice-item').forEach(row => {
            calculateRowTotal(row.querySelector('.item-quantity'));
        });
        calculateInvoiceTotal();
    }

    // ==========================================================================
    // 6. PERSISTENCE (LocalStorage)
    // ==========================================================================

    /**
     * Saves current state to LocalStorage.
     */
    function saveToLocal() {
        const data = collectInvoiceData();
        localStorage.setItem('invoiceData', JSON.stringify(data));
    }

    /**
     * Loads state from LocalStorage.
     */
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
     * Generates the shareable URL based on current data.
     * @returns {string} Full URL with query parameters.
     */
    function generateShareUrl() {
        const data = collectInvoiceData();
        // Remove items_array for cleaner URL
        const { items_array, ...urlData } = data;

        // Convert to URL params
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(urlData)) {
            if (value) params.append(key, value);
        }

        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }

    /**
     * Updates the input field and the browser URL without reloading.
     */
    function updateLiveUrl() {
        const link = generateShareUrl();
        document.getElementById('share_link').value = link;
        window.history.replaceState({}, '', link);
    }

    /**
     * Restores UI from a data object.
     * @param {object} data - The invoice data object.
     */
    function restoreData(data) {
        if (data.lang) state.lang = data.lang;
        if (data.currency) state.currency = data.currency;
        if (data.dateFormat) state.dateFormat = data.dateFormat;
        if (data.timeFormat) state.timeFormat = data.timeFormat;

        if (data.color) {
            document.getElementById('colorPicker').value = data.color;
            changeColor(data.color);
        }

        const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el && val) el.innerText = val;
        };

        // Restore text fields
        ['invoice_number', 'bill_to_name', 'bill_to_address', 'bill_to_phone', 'bill_to_email',
            'bill_from_name', 'bill_from_address', 'bill_from_phone', 'bill_from_email',
            'bank_name', 'branch_name', 'account_type', 'account_number', 'account_holder', 'invoice_notes']
            .forEach(id => setTxt(id, data[id]));

        // Restore Items
        const tbody = document.getElementById('invoice_items');
        tbody.innerHTML = '';
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
     * @returns {object} Data object.
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

        const getTxt = (id) => {
            const el = document.getElementById(id);
            return el ? el.innerText : '';
        };

        return {
            invoice_number: getTxt('invoice_number'),
            bill_to_name: getTxt('bill_to_name'),
            bill_to_address: getTxt('bill_to_address'),
            bill_to_phone: getTxt('bill_to_phone'),
            bill_to_email: getTxt('bill_to_email'),
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
            items: JSON.stringify(items), // Kept for legacy URL compatibility
            lang: state.lang,
            currency: state.currency,
            dateFormat: state.dateFormat,
            timeFormat: state.timeFormat,
            color: document.getElementById('colorPicker').value
        };
    }

    /**
     * Clears content fields but keeps configuration (Lang, Currency, etc).
     */
    function clearData() {
        const t = translations[state.lang] || translations['en'];
        
        if (confirm(t.confirm_clear)) {
            // 1. Clear all editable text fields (except Invoice Number, which we regen)
            document.querySelectorAll('.editable-field').forEach(el => {
                if (el.id !== 'invoice_number') {
                    el.innerText = '';
                }
            });

            // 2. Reset Invoice Number
            document.getElementById('invoice_number').innerText = generateInvoiceNumber();

            // 3. Reset Dates to Today/Now
            document.getElementById('date').value = '';
            document.getElementById('time').value = '';
            updateDateDisplay();
            updateTimeDisplay();

            // 4. Reset Table Items
            const tbody = document.getElementById('invoice_items');
            tbody.innerHTML = '';
            addItem(); // Add one empty row

            // 5. Clear URL parameters
            window.history.replaceState({}, '', window.location.pathname);

            // 6. Force Save to overwrite LocalStorage with the clean state
            // Note: This preserves 'state' (lang, currency, etc) because saveToLocal reads from the UI Selects which we didn't touch
            saveToLocal();
        }
    }

    /**
     * Copies the current state URL to clipboard.
     */
    function copyShareLink() {
        saveToLocal();
        const link = generateShareUrl();

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

    /**
     * Parses URL parameters on load.
     * @returns {boolean} True if data was loaded from URL, False otherwise.
     */
    function handleUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        
        // We consider it "loaded from URL" if there is at least an invoice number or items
        if (!params.has('invoice_number') && !params.has('items')) return false;

        const data = {};
        for (const [key, value] of params.entries()) {
            data[key] = value;
        }

        if (params.get('items')) {
            try {
                data.items_array = JSON.parse(params.get('items'));
            } catch (e) {
                console.warn("Failed to parse items from URL");
            }
        }

        restoreData(data);
        return true;
    }

    /**
     * Generates and downloads the PDF using html2pdf.js.
     */
    function downloadPDF() {
        const element = document.getElementById('pdf_element');
        const invoiceNum = document.getElementById('invoice_number').innerText || 'invoice';

        // Clone DOM to clean up for print without affecting UI
        const clone = element.cloneNode(true);
        clone.classList.add('pdf-clean-mode');

        // Inject the current share URL into the footer link
        const currentUrl = generateShareUrl();
        const linkElement = clone.querySelector('#pdf_recreate_link');
        if (linkElement) linkElement.href = currentUrl;

        // Cleanup: Remove UI-only elements
        clone.querySelectorAll('.action-column').forEach(el => el.remove());
        clone.querySelectorAll('.no-print').forEach(el => el.remove());

        // Force Notes Wrapping
        const notesField = clone.querySelector('#invoice_notes');
        if (notesField) {
            notesField.style.whiteSpace = "pre-wrap"; 
            notesField.style.wordBreak = "break-word";
            notesField.style.overflowWrap = "break-word";
            notesField.style.width = "100%";
            notesField.style.display = "block";
        }

        // Cleanup: Remove empty Contact Lines (Phone/Email)
        clone.querySelectorAll('.contact-line').forEach(line => {
            const field = line.querySelector('.editable-field');
            if (field && !field.innerText.trim()) {
                line.remove();
            }
        });

        // Cleanup: Remove empty Addresses
        ['bill_from_address', 'bill_to_address'].forEach(id => {
            const field = clone.querySelector(`#${id}`);
            if (field && !field.innerText.trim()) {
                const parent = field.closest('.d-flex');
                if (parent) parent.remove();
            }
        });

        // Remove contenteditable to fix cursor issues
        clone.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
        });

        // Ensure table takes full width
        const table = clone.querySelector('table');
        if (table) table.style.width = '100%';

        // Expand Amount Column
        const descHeader = clone.querySelector('th[data-i18n="col_amount"]');
        if (descHeader) descHeader.setAttribute('width', '27%');

        // Handle Inputs: Convert to Text spans
        clone.querySelectorAll('input').forEach(input => {
            if ((input.type === 'date' || input.type === 'time') && !input.value) {
                const wrapper = input.closest('.d-flex');
                if (wrapper) wrapper.remove();
                return;
            }

            const span = document.createElement('span');
            span.className = input.className;
            span.style.border = "none";
            span.style.padding = "0";
            span.style.backgroundColor = "transparent";
            span.classList.remove('form-control');

            // Date Formatting
            if (input.type === 'date') {
                const rawDate = input.value;
                let formattedDate = rawDate;
                if (rawDate) {
                    const [y, m, d] = rawDate.split('-');
                    if (state.dateFormat === 'jp') formattedDate = `${y}-${m}-${d}`;
                    else if (state.dateFormat === 'us') formattedDate = `${m}/${d}/${y}`;
                    else if (state.dateFormat === 'br') formattedDate = `${d}/${m}/${y}`;
                }
                span.innerText = formattedDate;
                span.style.textAlign = "right";
            }
            // Time Formatting
            else if (input.type === 'time') {
                const rawTime = input.value;
                let formattedTime = rawTime;
                if (rawTime && state.timeFormat === '12h') {
                    const [h, m] = rawTime.split(':');
                    const hours = parseInt(h);
                    const suffix = hours >= 12 ? 'PM' : 'AM';
                    const h12 = hours % 12 || 12;
                    formattedTime = `${h12}:${m} ${suffix}`;
                }
                span.innerText = formattedTime;
                span.style.textAlign = "right";
            }
            // Standard Inputs
            else {
                span.innerText = input.value;
                span.style.textAlign = input.style.textAlign || "center";
                if (input.classList.contains('item-description')) span.style.textAlign = "left";
            }

            if (input.parentNode) input.parentNode.replaceChild(span, input);
        });

        // Styling Overrides for PDF
        clone.style.backgroundColor = "#ffffff";
        clone.style.padding = "20px";

        // Append clone to body so html2canvas can parse computed styles
        document.body.appendChild(clone);

        // Configuration
        const opt = {
            margin: [5, 5, 5, 5],
            filename: `invoice_${invoiceNum}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf()
            .set(opt)
            .from(clone)
            .save()
            .then(() => {
                document.body.removeChild(clone);
            })
            .catch((err) => {
                console.error('PDF Generation Error:', err);
                // Ensure cleanup happens even on error
                if (document.body.contains(clone)) {
                    document.body.removeChild(clone);
                }
            });
    }

    // Public API
    return { init, addItem, removeItem, calculateRowTotal, clearData, copyShareLink, downloadPDF };
})();

// Start App
window.addEventListener('DOMContentLoaded', invoiceApp.init);