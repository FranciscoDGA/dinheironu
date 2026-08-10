css_append = """
/* ==========================================================================
   MOBILE SEARCH BAR FIX
   ========================================================================== */
@media (max-width: 768px) {
    .nav-container {
        flex-wrap: wrap;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    
    .nav-logo {
        flex: 1;
    }
    
    .mobile-menu-btn {
        margin-left: auto;
    }
    
    .search-form {
        order: 3;
        width: 100%;
        margin-left: 0 !important;
        margin-top: 16px;
    }
    
    .search-form input {
        flex: 1;
        width: 100%;
    }
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)
print("Mobile search fix appended to CSS.")
