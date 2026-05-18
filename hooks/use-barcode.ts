import barcodeService from "@/services/barcode.service";
import { IBarcode } from "@/types/models/barcode.model";
import { useMutation } from "@tanstack/react-query";

export function useGenerateBarcode() {
    const { data, status, mutate, mutateAsync, reset } = useMutation({
        mutationKey: ["generate-barcode"],
        mutationFn: (variables: IBarcode) =>
            barcodeService.generateBarcode(variables),
    });

    const barcodeBase64 = data?.isError === false ? data.data : null;

    return { barcodeBase64, data, status, mutate, mutateAsync, reset };
}
