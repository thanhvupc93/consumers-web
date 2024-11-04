
export default function formatCurrency(data: number, locale: string) {
        if (locale === 'vi') {
            return `${data} VNĐ`
        } else {
            return` $ ${data}`
    }
}
