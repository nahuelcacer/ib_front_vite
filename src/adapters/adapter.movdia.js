const adapterMovdia = (account) => {
    return {
        ...account,
        value: account.account_number,
        label: account.bank_name,
        img: `https://sib1.interbanking.com.ar/skins/bancos/branding/v2/logo${account.bank_number}.png` 
    }
}

export default adapterMovdia;
