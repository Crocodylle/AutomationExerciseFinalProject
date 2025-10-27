# 🎯 Seletores Validados - Chrome DevTools MCP

**Data**: 25 de Outubro de 2025  
**Fonte**: Navegação real no site usando Chrome DevTools MCP  
**Status**: ✅ **VALIDADO NO BROWSER REAL**

---

## 📊 Navegação Principal

| Elemento | Seletor Validado | Atributo |
|----------|------------------|----------|
| Home | `a[href="/"]` | href |
| Products | `a[href="/products"]` | href |
| Cart | `a[href="/view_cart"]` | href |
| Signup/Login | `a[href="/login"]` | href |
| Test Cases | `a[href="/test_cases"]` | href |
| Contact Us | `a[href="/contact_us"]` | href |
| Logout | `a[href="/logout"]` | href |
| Delete Account | `a[href="/delete_account"]` | href |

---

## 🏠 Home Page

| Elemento | Seletor Validado | Atributo | Observação |
|----------|------------------|----------|------------|
| Logo | `.logo` ou `img[alt*="automation"]` | class/alt | - |
| Subscription Input | `input#susbscribe_email` | **id** | ⚠️ **TYPO: "susbscribe"** |
| Subscription Button | `button#subscribe` | id | - |
| Features Items | `.features_items` | class | - |
| Recommended Items | `.recommended_items` | class | - |

---

## 🔐 Login Page (/login)

### Login Form

| Campo | Seletor Validado | Data-QA | Observação |
|-------|------------------|---------|------------|
| Email | `input[data-qa="login-email"]` | ✅ **login-email** | - |
| Password | `input[data-qa="login-password"]` | ✅ **login-password** | - |
| Button | `button[data-qa="login-button"]` | ✅ **login-button** | - |
| Heading | texto: "Login to your account" | - | `h2` |

### Signup Form

| Campo | Seletor Validado | Data-QA | Observação |
|-------|------------------|---------|------------|
| Name | `input[data-qa="signup-name"]` | ✅ **signup-name** | - |
| Email | `input[data-qa="signup-email"]` | ✅ **signup-email** | - |
| Button | `button[data-qa="signup-button"]` | ✅ **signup-button** | - |
| Heading | texto: "New User Signup!" | - | `h2` |

---

## 📝 Signup Page (/signup)

### Account Information

| Campo | Seletor Validado | Data-QA | ID Alternativo | Observação |
|-------|------------------|---------|----------------|------------|
| Heading | texto: "Enter Account Information" | - | - | `h2` |
| Title Mr | `input#id_gender1` | ❌ **NÃO TEM** | `id_gender1` | ⚠️ **USA ID, NÃO DATA-QA** |
| Title Mrs | `input#id_gender2` | ❌ **NÃO TEM** | `id_gender2` | ⚠️ **USA ID, NÃO DATA-QA** |
| Name | `input[data-qa="name"]` | ✅ **name** | `id="name"` | - |
| Email | `input[data-qa="email"]` | ✅ **email** | `id="email"` | disabled |
| Password | `input[data-qa="password"]` | ✅ **password** | `id="password"` | - |
| Day | `select[data-qa="days"]` | ✅ **days** | `id="days"` | - |
| Month | `select[data-qa="months"]` | ✅ **months** | `id="months"` | - |
| Year | `select[data-qa="years"]` | ✅ **years** | `id="years"` | - |
| Newsletter | `input#newsletter` | ❌ **NÃO TEM** | `id="newsletter"` | checkbox |
| Special Offers | `input#optin` | ❌ **NÃO TEM** | `id="optin"` | checkbox |

### Address Information

| Campo | Seletor Validado | Data-QA | ID Alternativo | Observação |
|-------|------------------|---------|----------------|------------|
| First Name | `input[data-qa="first_name"]` | ✅ **first_name** | `id="first_name"` | - |
| Last Name | `input[data-qa="last_name"]` | ✅ **last_name** | `id="last_name"` | - |
| Company | `input[data-qa="company"]` | ✅ **company** | `id="company"` | - |
| Address | `input[data-qa="address"]` | ✅ **address** | `id="address1"` | - |
| Address 2 | `input[data-qa="address2"]` | ✅ **address2** | `id="address2"` | - |
| Country | `select[data-qa="country"]` | ✅ **country** | `id="country"` | - |
| State | `input[data-qa="state"]` | ✅ **state** | `id="state"` | - |
| City | `input[data-qa="city"]` | ✅ **city** | `id="city"` | - |
| Zipcode | `input[data-qa="zipcode"]` | ✅ **zipcode** | `id="zipcode"` | - |
| Mobile Number | `input[data-qa="mobile_number"]` | ✅ **mobile_number** | `id="mobile_number"` | - |
| Create Account Button | `button[data-qa="create-account"]` | ✅ **create-account** | - | - |

---

## 🛍️ Products Page

| Elemento | Seletor Validado | Atributo | Observação |
|----------|------------------|----------|------------|
| Product Container | `.product-image-wrapper` | class | - |
| Single Product | `.single-products` | class | - |
| Add to Cart | `a[data-product-id="1"]` | **data-product-id** | ⚠️ **USA data-product-id** |
| View Product | `a[href="/product_details/1"]` | href | - |
| Product Price | `h2` dentro de product | - | Ex: "Rs. 500" |
| Product Name | `p` dentro de product | - | Ex: "Blue Top" |
| Search Input | `input#search_product` | **id** | - |
| Search Button | `button#submit_search` | id (provável) | - |

---

## 🛒 Categories & Brands

### Categories

| Elemento | Seletor Validado | Href | Observação |
|----------|------------------|------|------------|
| Women | `a[href="#Women"]` | #Women | data-toggle="collapse" |
| Men | `a[href="#Men"]` | #Men | data-toggle="collapse" |
| Kids | `a[href="#Kids"]` | #Kids | data-toggle="collapse" |

### Brands

| Elemento | Seletor Validado | Href |
|----------|------------------|------|
| Polo | `a[href="/brand_products/Polo"]` | /brand_products/Polo |
| H&M | `a[href="/brand_products/H&M"]` | /brand_products/H&M |

---

## 📦 Recommended Items

| Elemento | Seletor Validado | Observação |
|----------|------------------|------------|
| Section | `.recommended_items` | class |
| Add to Cart | `a[data-product-id]` dentro de `.recommended_items` | usa data-product-id |

---

## ⚠️ Problemas Identificados nos Testes

### 1. **Title (Mr/Mrs) - USA ID, NÃO DATA-QA**
```javascript
// ❌ ERRADO (atual):
cy.get('input[data-qa="title"]')

// ✅ CORRETO:
cy.get('input#id_gender1').check() // Mr
cy.get('input#id_gender2').check() // Mrs
```

### 2. **Subscription Input - TYPO NO ID**
```javascript
// ❌ ERRADO (atual):
cy.get('input#subscribe_email')

// ✅ CORRETO:
cy.get('input#susbscribe_email') // Note o typo "susbscribe"
```

### 3. **Add to Cart - USA data-product-id**
```javascript
// ❌ ERRADO (trigger em múltiplos elementos):
cy.get('.add-to-cart').trigger('mouseover')

// ✅ CORRETO:
cy.get('.single-products').first().within(() => {
  cy.get('.add-to-cart').trigger('mouseover')
  cy.get('.add-to-cart').click()
})
```

### 4. **Scroll - Body não é scrollable**
```javascript
// ❌ ERRADO:
cy.scrollTo('bottom')

// ✅ CORRETO:
cy.scrollTo('bottom', { ensureScrollable: false })
// OU
cy.window().scrollTo(0, document.body.scrollHeight)
```

---

## 🎯 Prioridades de Correção

### Alta Prioridade
1. ✅ Corrigir seletor de title (id_gender1/id_gender2)
2. ✅ Corrigir subscription input (susbscribe_email)
3. ✅ Corrigir add-to-cart para usar .within()
4. ✅ Corrigir scrollTo com ensureScrollable: false

### Média Prioridade
5. ✅ Verificar/corrigir mensagens de erro de login
6. ✅ Verificar texto "Logged in as" 
7. ✅ Verificar newsletter/optin checkboxes

---

## ✅ Seletores que ESTÃO CORRETOS

- ✅ Login email/password (data-qa funciona)
- ✅ Signup name/email (data-qa funciona)
- ✅ Signup form completo (data-qa funciona na maioria)
- ✅ Address form (data-qa funciona)
- ✅ Navigation links (href funciona)
- ✅ Product links (href funciona)

---

**Última Atualização**: 2025-10-25  
**Validado Por**: Chrome DevTools MCP  
**Status**: ✅ **PRONTO PARA CORREÇÕES**

