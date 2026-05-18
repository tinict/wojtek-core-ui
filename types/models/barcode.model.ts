export interface IBarcode {
    format: string;
    barcodeText: string;
    barcodeFormatId?: string;
    width: number;
    height: number;
};

export const BARCODE_FORMATS = [
    { value: "QR_CODE", label: "QR Code" },
    { value: "CODE_128", label: "Code 128" },
    { value: "CODE_39", label: "Code 39" },
    { value: "EAN_13", label: "EAN 13" },
    { value: "EAN_8", label: "EAN 8" },
    { value: "PDF_417", label: "PDF 417" },
    { value: "ITF", label: "ITF" },
    { value: "AZTEC", label: "Aztec" },
    { value: "DATA_MATRIX", label: "Data Matrix" },
];