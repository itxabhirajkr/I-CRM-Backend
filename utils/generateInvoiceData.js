import moment from 'moment';

const generateInvoiceData = ({ invoice, client, project, preparedBy, reviewedBy }) => {
  const {
    number,
    date,
    dueDate,
    currency,
    serviceFromDate,
    serviceToDate,
    mileStones,
    poNumber,
    serialNumber,
    services,
    status,
    paidAmount,
    forgivenAmount,
    paymentChannel,
    lostAmountINR
  } = invoice;

  const businessName = client.businessName || 'N/A';
  const billingContactPerson = client.billingContactPerson || 'N/A';
  const address = client.address || 'N/A';
  const billingToEmail = client.email || 'N/A';
  const gstin = client.gstin || 'N/A';
  const placeOfSupply = client.placeOfSupply || 'N/A';
  const country = client.country || 'N/A';
  const qrCode = '<QR Code Here>'; // Placeholder for actual QR code generation
  const currentCharges = services.reduce((acc, service) => acc + service.taxableAmount, 0);
  const previousDues = 1260; // Example previous dues, replace with actual data
  const totalAmountDue = currentCharges + previousDues;
  const totalAmountDueINR = totalAmountDue * 83.55; // Example conversion rate, replace with actual rate

  return {
    invoiceDetails: {
      number,
      date: moment(date).format('YYYY-MMM-DD'),
      dueDate: moment(dueDate).format('YYYY-MMM-DD'),
      currency,
      clientName: client.businessName,
      projectName: project.name,
      serviceFromDate: serviceFromDate ? moment(serviceFromDate).format('YYYY-MMM-DD') : '',
      serviceToDate: serviceToDate ? moment(serviceToDate).format('YYYY-MMM-DD') : '',
      mileStones,
      poNumber,
      serialNumber,
      preparedBy: preparedBy.name,
      reviewedBy: reviewedBy.map(user => user.name).join(', '),
      status,
      paidAmount,
      forgivenAmount,
      paymentChannel,
      lostAmountINR
    },
    companyDetails: {
      name: 'Inzint Private Limited',
      address: 'B-111, Sector 65, Noida, India, 201301',
      gstin: '09AAFCI7567Q1ZK'
    },
    billingDetails: {
      businessName,
      billingContactPerson,
      address,
      billingToEmail,
      gstin,
      placeOfSupply,
      country
    },
    qrCode,
    currentCharges,
    previousDues,
    totalAmountDue,
    totalAmountDueINR: totalAmountDueINR.toFixed(2),
    services: services.map(service => ({
      name: service.name,
      fromDate: service.fromDate ? moment(service.fromDate).format('YYYY-MMM-DD') : '',
      toDate: service.toDate ? moment(service.toDate).format('YYYY-MMM-DD') : '',
      mileStone: service.mileStone,
      sac: service.SAC,
      hours: service.hours,
      rate: service.rate,
      discountPercent: service.discountPercent,
      taxableValue: service.taxableAmount,
      sgstRate: service.sgstRate,
      sgstAmount: service.sgstAmount,
      cgstRate: service.cgstRate,
      cgstAmount: service.cgstAmount,
      igstRate: service.igstRate,
      igstAmount: service.igstAmount,
      totalAmount: service.taxableAmount + service.sgstAmount + service.cgstAmount + (service.igstAmount || 0)
    }))
  };
};

export default generateInvoiceData;
