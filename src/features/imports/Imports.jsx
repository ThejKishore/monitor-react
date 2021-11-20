
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import './Imports.css';

const ImportGroup = () => {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const productService = new ProductService();

    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
            toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        }
    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    }

    const onRowCollapse = (event) => {
        toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    }

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => _expandedRows[`${p.id}`] = true);

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Orders for {data.name}</h5>
                <DataTable value={data.orders} responsiveLayout="scroll">
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column>
                    <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column>
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column>
                    <Column headerStyle={{ width: '4rem'}} body={searchBodyTemplate}></Column>
                </DataTable>
            </div>
        );
    }

    return (
        <div className="datatable-rowexpansion-demo">
            <div className="card">
                <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                    <Column expander style={{ width: '3em' }} />
                    <Column field="name" header="Name" sortable />
                    <Column header="Image" body={imageBodyTemplate} />
                    <Column field="price" header="Price" sortable body={priceBodyTemplate} />
                    <Column field="category" header="Category" sortable />
                    <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} />
                    <Column field="inventoryStatus" header="Status" sortable body={statusBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
}

export default ImportGroup;
                 