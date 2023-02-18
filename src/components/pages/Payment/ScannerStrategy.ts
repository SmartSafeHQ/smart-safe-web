interface IScanner {
  scan(_codeData: string): unknown
}

export type QrCodeData = {
  merchantName: string
  transactionAmount: number
}

export class QrCodeScanner implements IScanner {
  scan(codeData: string): QrCodeData {
    const qrCodeData = codeData.substring(6)
    const qrCodeDataLength = qrCodeData.length

    const extractedData: QrCodeData = { merchantName: '', transactionAmount: 0 }
    let nextIterationStartIndex = 0

    while (nextIterationStartIndex < qrCodeDataLength) {
      const id = parseInt(
        qrCodeData.substring(
          nextIterationStartIndex,
          nextIterationStartIndex + 2
        )
      )

      nextIterationStartIndex += 2

      const dataLength = parseInt(
        qrCodeData.substring(
          nextIterationStartIndex,
          nextIterationStartIndex + 2
        )
      )

      nextIterationStartIndex += 2

      const data = qrCodeData.substring(
        nextIterationStartIndex,
        nextIterationStartIndex + dataLength
      )

      // for more info, see EMVCo-Merchant-Presented-QR-Specification-v1.1
      switch (id) {
        case 54: {
          Object.assign(extractedData, { transactionAmount: data })
          break
        }
        case 59: {
          Object.assign(extractedData, { merchantName: data })
          break
        }
        default: {
          break
        }
      }

      nextIterationStartIndex += dataLength
    }

    return extractedData
  }
}

export class ScannerStrategy {
  #scannerType: IScanner

  constructor(scannerType: IScanner) {
    this.#scannerType = scannerType
  }

  set changeScannerType(scannerType: IScanner) {
    this.#scannerType = scannerType
  }

  scan(codeData: string) {
    return this.#scannerType.scan(codeData)
  }
}
