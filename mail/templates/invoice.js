const invoiceTemplate = (invoiceData) => {
  return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
        </head>
        <body>
        <div
        className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6"
        id="invoice"
      >
        <h1 className="flex justify-center text-xl font-bold">Tax Invoice</h1>
        {/* Client info */}
        <div className="mt-8">
          <table className="min-w-full ">
            <tbody>
              {/* First Row */}
              <tr className="border-b border-gray-200 ">
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <h1 className="font-bold text-3xl">INZINT</h1>
                  <p className="text-gray-500">
                    Inzint Private Limited
                    <br />
                    B-111, Sector 65, Noida, India, 201301
                  </p>
                  <p className="text-gray-500">GSTIN: 09AAFCI7567Q1ZK</p>
                </td>
                <td className="p-4 text-right text-sm font-normal text-gray-700 border-l border-gray-200">
                  <p>
                    Invoice number:
                    <span className="text-gray-500"> INV-2023786123</span>
                  </p>
                  <p>
                    Invoice date:
                    <span className="text-gray-500"> 03/07/2023</span>
                    <br />
                    Due date:
                    <span className="text-gray-500"> 31/07/2023</span>
                  </p>
                </td>
              </tr>
              {/* Second Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <p className="text-gray-500">
                    Some Other LLC.
                    <br />
                    203, New York, NY, USA
                  </p>
                  <p className="text-gray-500">contact@someother.com</p>
                </td>
                <td className="p-4 text-right text-sm font-normal text-gray-700 border-l border-gray-200">
                  <BsQrCode className="text-6xl ml-60" />
                </td>
              </tr>
              {/* Third Row */}
              <tr>
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <p className="text-gray-500">
                    Project: Inzint CRM
                    <br />
                    Service Period: 18/05/2024 - 25/06/2024
                  </p>
                  <p className="text-gray-500">Milestones: Inzint</p>
                  <p className="text-gray-400 text-sm">
                    (whichever of the above is applicable)
                  </p>
                </td>
                <td className="p-4 text-right text-sm font-normal text-gray-700 border-l border-gray-200">
                  <p>Doc #: INV-2023786125</p>
                  <p>PO# : INV-2023786125</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        {/* Invoice Items */}
        <div className="flow-root">
          <div className="flex flex-col mt-2">
            <table className="min-w-full divide-y divide-slate-200 border border-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    Services
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell border-r border-gray-200"
                  >
                    SAC
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell border-r border-gray-200"
                  >
                    Hrs
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    Rate
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    Dis.
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    Taxable Value
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    SGST
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    CGST
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 border-r border-gray-200"
                  >
                    IGST
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-normal text-slate-700"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Item Row 1 */}
                <tr className="border-b border-slate-200">
                  <td className="py-4 pl-6 pr-3 text-sm border-r border-gray-200">
                    <div className="font-medium text-slate-700">VidyChat</div>
                    <div className="mt-0.5 text-slate-500 sm:hidden">
                      1 unit at $0.00
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell border-r border-gray-200">
                    48
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500">
                    $0.00
                  </td>
                </tr>
                {/* Item Row 2 */}
                <tr className="border-b border-slate-200">
                  <td className="py-4 pl-6 pr-3 text-sm border-r border-gray-200">
                    <div className="font-medium text-slate-700">Seo Workflow</div>
                    <div className="mt-0.5 text-slate-500 sm:hidden">
                      1 unit at $0.00
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell border-r border-gray-200">
                    4
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500 border-r border-gray-200">
                    $0.00
                  </td>
                  <td className="py-4 px-3 text-sm text-right text-slate-500">
                    $0.00
                  </td>
                </tr>
              </tbody>
              {/* Invoice Total */}
              <tfoot>
                <tr className="border-b border-slate-200">
                  <td
                    colSpan="7"
                    className="py-2 px-6 font-semibold text-gray-800 text-right border-r border-gray-200"
                  >
                    Subtotal:
                  </td>
                  <td colSpan="3" className="py-2 px-6 text-gray-500 text-right">
                    $2750.00
                  </td>
                </tr>
  
                <tr className="border-b border-slate-200">
                  <td
                    colSpan="1"
                    className="py-2 border-r  text-gray-500 text-center"
                  >
                    Prepared By
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 border-r text-gray-500 text-center"
                  >
                    Imtiyaz on 2024-04-28
                  </td>
                  <td
                    colSpan="2"
                    className="py-2 px-6 font-semibold text-gray-800 text-right border-r border-gray-200"
                  >
                    Tax:
                  </td>
                  <td colSpan="4" className="py-2 px-6 text-gray-500 text-right">
                    $39.00
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td
                    colSpan="1"
                    className="py-2 border-r  text-gray-500 text-center"
                  >
                    Reviewed By
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 border-r  text-gray-500 text-center"
                  >
                    Vikas, Jagdish
                  </td>
                  <td
                    colSpan="2"
                    className="py-2 px-6 font-semibold text-gray-800 text-right border-r border-gray-200"
                  >
                    Tax:
                  </td>
                  <td colSpan="4" className="py-2 px-6 text-gray-500 text-right">
                    $39.00
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td
                    colSpan="7"
                    className="py-2 px-6 font-semibold text-gray-800 text-right border-r border-gray-200"
                  >
                    Total:
                  </td>
                  <td colSpan="3" className="py-2 px-6 text-gray-500 text-right">
                    $2750.00
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    className="py-2 px-6 font-semibold text-gray-800 text-right border-r border-gray-200"
                  >
                    Due balance:
                  </td>
                  <td colSpan="3" className="py-4 px-6 text-gray-500 text-right">
                    $0.00
                  </td>
                </tr>
              </tfoot>
            </table>
            <h1 className="my-2 mx-6">Signature</h1>
          </div>
        </div>
      </div>
  
        </body>
        </html>`;
};
export default invoiceTemplate;
