export const maskCpf = (cpf) => {
    cpf = cpf.replace(/\D/g,"")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
};
export const maskPostalCode = (postalCode) => {
    postalCode = postalCode.replace(/\D/g,"")
    postalCode = postalCode.replace(/^(\d{2})(\d)/,"$1.$2")
    postalCode = postalCode.replace(/\.(\d{3})(\d)/,".$1-$2")
    return postalCode
};
export const maskPis = (pis) => {
    pis = pis.replace(/\D/g, "")
    pis = pis.replace(/^(\d{3})(\d)/, "$1.$2")
    pis = pis.replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3")
    pis = pis.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3.$4")
    return pis
};
