'use client';

import { useEffect, useState, Fragment } from 'react';
import {
  Package,
  RefreshCw,
  Filter,
  ArrowUpDown,
  ChevronDown,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Order, OrderStatus } from '@/store/ordersStore';
import { useAdminOrdersStore } from '@/store/adminOrders';
import { DesignDetails } from '@/store/cartStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/* ---------------- STATUS ----------------  */

const statuses: (OrderStatus | 'all')[] = [
  'all',
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
];

export default function AdminOrdersPage() {
  const {
    filteredOrders,
    fetchAllOrders,
    updateOrderStatus,
    setFilter,
    setSort,
    isLoading,
  } = useAdminOrdersStore();

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  /* ---------------- SAFE DESIGN PARSER ---------------- */

  const parseDesign = (design: unknown): DesignDetails | null => {
    if (!design) return null;

    if (typeof design === 'string') {
      try {
        return JSON.parse(design);
      } catch {
        return null;
      }
    }

    return design as DesignDetails;
  };

  /* ---------------- RENDER DESIGN ---------------- */

  const renderDesign = (rawDesign: unknown) => {
    const design = parseDesign(rawDesign);

    if (!design || !design.type) {
      return <span className="opacity-50">—</span>;
    }

    if (design.type === 'have-design') {
      return (
        <div className="space-y-2 text-xs">
          <div className="badge badge-info text-[8px]">Have Design</div>

          {design.designFile && (
            <a
              href={design.designFile}
              target="_blank"
              className="link flex items-center gap-1"
            >
              <FileText size={14} /> View File
            </a>
          )}
        </div>
      );
    }

    if (design.type === 'design-for-me') {
      return (
        <div className="space-y-2 text-xs">
          <div className="badge badge-warning text-[8px]">Design Request</div>

          <div>
            <strong>Business:</strong>{' '}
            {design.businessName || '—'}
          </div>

          <div>
            <strong>Description:</strong>{' '}
            {design.description || '—'}
          </div>

          {design.logo ? (
            <a
              href={design.logo}
              target="_blank"
              className="link flex items-center gap-1"
            >
              <ImageIcon size={14} /> View Logo
            </a>
          ) : design.noLogo ? (
            <div className="italic opacity-60">
              No Logo Provided
            </div>
          ) : null}
        </div>
      );
    }

    return <span className="opacity-50">—</span>;
  };


  const generateReceiptPDF = (order: Order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text('C-Chu Media', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text('Birthing your Imagination', 105, 27, { align: 'center' });

    // Logo placeholder
    doc.setFontSize(9);
    doc.setTextColor(100);
    // doc.text('[ Logo goes here ]', 105, 35, { align: 'center' });

    doc.line(20, 40, 190, 40);

    // Order info
    doc.setFontSize(12);
    doc.text(`Receipt / Order #${order.id}`, 20, 55);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 63);

    // Customer
    doc.text('Customer:', 20, 75);
    doc.setFontSize(10);
    doc.text(`${order.first_name} ${order.last_name}`, 50, 75);
    doc.text(`${order.email}`, 50, 81);
    doc.text(`${order.phone || '—'}`, 50, 87);

    // Address
    doc.text('Delivery Address:', 110, 75);
    doc.text(`${order.address_line1 || '—'}`, 140, 75);
    if (order.address_line2) doc.text(`${order.address_line2}`, 140, 81);
    doc.text(`${order.state || '—'}`, 140, 87);

    // Items table
    const tableData = order.items?.map((item) => [
      item.name || '—',
      `NGN${Number(item.price || 0).toLocaleString()}`,
      item.quantity || 0,
      `NGN${(Number(item.price || 0) * (item.quantity || 0)).toLocaleString()}`,
    ]) || [];

    autoTable(doc, {
      startY: 100,
      head: [['Product', 'Price', 'Qty', 'Total']],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [66, 139, 202] },
      margin: { left: 20, right: 20 },
    });

    // Totals
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;

    doc.setFontSize(10);
    doc.text('Subtotal:', 140, finalY);
    doc.text(`NGN${Number(order.subtotal || 0).toLocaleString()}`, 170, finalY);

    doc.text('Tax:', 140, finalY + 7);
    doc.text(`NGN${Number(order.tax_amount || 0).toLocaleString()}`, 170, finalY + 7);

    doc.text('Delivery:', 140, finalY + 14);
    doc.text(`NGN${Number(order.delivery_fee || 0).toLocaleString()}`, 170, finalY + 14);

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(140, finalY + 18, 190, finalY + 18);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', 140, finalY + 26);
    doc.text(`NGN${Number(order.total_amount || 0).toLocaleString()}`, 170, finalY + 26);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('Thank you for choosing C-Chu Media!', 105, finalY + 45, { align: 'center' });
    doc.text('www.cchumedia.com • support@cchumedia.com', 105, finalY + 52, { align: 'center' });

    // Download
    doc.save(`C-Chu_Media_Receipt_${order.id}.pdf`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex gap-2 items-center">
          <Package size={24} /> Orders Dashboard
        </h1>

        <button
          className="btn btn-outline btn-sm"
          onClick={fetchAllOrders}
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select
            className="select select-bordered"
            onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} />
          <select
            className="select select-bordered"
            onChange={(e) => setSort(e.target.value as 'date' | 'status')}
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <Fragment key={order.id}>
                  {/* MAIN ROW */}
                  <tr>
                    <td>
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="btn btn-ghost btn-sm"
                      >
                        <ChevronDown
                          className={`transition ${
                            expandedOrder === order.id
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </button>
                    </td>

                    <td>
                      {order.first_name} {order.last_name}
                      <div className="text-xs opacity-60">
                        {order.email}
                      </div>
                    </td>

                    <td>
                      ₦{order.total_amount.toLocaleString()}
                    </td>

                    <td>
                      <span className="badge badge-outline">
                        {order.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <select
                        className="select select-sm select-bordered"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                      >
                        {statuses
                          .filter((s) => s !== 'all')
                          .map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                      </select>
                    </td>
                  </tr>

                  {/* EXPANDED ROW */}
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={6}>
                        <div className="bg-base-200 p-4 rounded-xl space-y-6">

                          {/* CUSTOMER INFO */}
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-semibold">Phone</p>
                              <p>{order.phone}</p>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Address
                              </p>
                              <p>
                                {order.address_line1},{" "}
                                {order.address_line2 || ''}
                              </p>
                            </div>

                            <div>
                              <p className="font-semibold">State</p>
                              <p>{order.state}</p>
                            </div>
                          </div>

                          {/* ITEMS */}
                          <div>
                            <h2 className="font-semibold mb-2">
                              Order Items
                            </h2>

                            <div className="overflow-x-auto">
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Specs</th>
                                    <th>Design</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {order.items &&
                                  order.items.length > 0 ? (
                                    order.items.map((item, idx) => (
                                      <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>₦{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                          ₦
                                          {(
                                            item.price *
                                            item.quantity
                                          ).toLocaleString()}
                                        </td>

                                        <td className="text-xs">
                                          {item.specs
                                            ? JSON.stringify(
                                                item.specs
                                              )
                                            : '—'}
                                        </td>

                                        <td>
                                          {renderDesign(
                                            item.design
                                          )}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={6}
                                        className="text-center text-sm opacity-60"
                                      >
                                        No items found
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* SUMMARY */}
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-semibold">
                                Subtotal
                              </p>
                              <p>₦{order.subtotal.toLocaleString()}</p>
                            </div>

                            <div>
                              <p className="font-semibold">Tax</p>
                              <p>₦{order.tax_amount.toLocaleString()}</p>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Delivery
                              </p>
                              <p>₦{order.delivery_fee.toLocaleString()}</p>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Total
                              </p>
                              <p className="font-bold">
                                ₦{order.total_amount.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* ────────────── NEW BUTTON ────────────── */}
                          <div className={`
                              flex pt-4
                              ${order.receipt_url ? 'justify-between' : 'justify-end'}
                            `}>
                            {order.receipt_url && <button
                              className="btn btn-neutral btn-sm gap-2"
                              onClick={() => order.receipt_url && window.open(order.receipt_url, '_blank')}
                            >
                              <FileText size={16} />
                              View Transfer Receipt
                            </button>}
                            <button
                              className="btn btn-primary btn-sm gap-2"
                              onClick={() => generateReceiptPDF(order)}
                            >
                              <FileText size={16} />
                              Download Receipt (PDF)
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}