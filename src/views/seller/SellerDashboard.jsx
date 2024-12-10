import React, { useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { RiProductHuntLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Chart from 'react-apexcharts';
import customer from '../../assets/seller.png';
import { useSelector, useDispatch } from 'react-redux';
import { get_seller_dashboard_index_data } from '../../store/Reducers/dashboardIndexReducer';
import moment from 'moment';

const SellerDashboard = () => {
    const { userInfo } = useSelector(state => state.auth);
    const {
        totalSale,
        totalOrder,
        totalProduct,
        totalPendingOrder,
        totalSeller,
        recentOrders,
        recentMessage,
    } = useSelector(state => state.dashboardIndex);

    const statusMap = {
        pending: 'Pendiente',
        paid: 'Pagado',
        unpaid: 'No pagado',
        processing: 'En proceso',
        warehouse: 'En almacén',
        placed: 'Listo para envío',
        cancelled: 'Cancelado',
    };

    const state = {
        series: [
            {
                name: 'Ordenes',
                data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
            },
            {
                name: 'Ingresos',
                data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
            },
            {
                name: 'Ventas',
                data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
            },
        ],
        options: {
            color: ['#181ee8', '#181ee8'],
            plotOptions: {
                radius: 30,
            },
            chart: {
                background: 'transparent',
                foreColor: '#000000',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: ['smooth', 'straight', 'stepline'],
                lineCap: 'butt',
                colors: '#f0f0f0',
                width: 0.5,
                dashArray: 0,
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            legend: {
                position: 'top',
            },
            responsive: [
                {
                    breakpoint: 565,
                    yaxis: {
                        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    },
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            },
                        },
                        chart: {
                            height: '550px',
                        },
                    },
                },
            ],
        },
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_seller_dashboard_index_data());
    }, [dispatch]);

    return (
        <div className="px-2 md:px-7 py-5 bg-[#006400]">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
                <div className="flex justify-between items-center p-5 bg-[#FFFFFF] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#000000]">
                        <h2 className="text-3xl font-bold">S/{totalSale}</h2>
                        <span className="text-md font-medium">Ventas Totales</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#FFFFFF] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#000000]">
                        <h2 className="text-3xl font-bold">{totalProduct}</h2>
                        <span className="text-md font-medium">Productos</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
                        <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#FFFFFF] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#000000]">
                        <h2 className="text-3xl font-bold">{totalOrder}</h2>
                        <span className="text-md font-medium">Órdenes</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
                        <AiOutlineShoppingCart className="text-[#00cfe8] shadow-lg" />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5 bg-[#FFFFFF] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#000000]">
                        <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
                        <span className="text-md font-medium">Órdenes Pendientes</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
                        <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-wrap mt-7">
                <div className="w-full lg:w-7/12 lg:pr-3">
                    <div className="w-full bg-[#FFFFFF] p-4 rounded-md">
                        <Chart options={state.options} series={state.series} type="bar" height={350} />
                    </div>
                </div>
                <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                    <div className="w-full bg-[#FFFFFF] p-4 rounded-md text-[#d0d2d6]">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-black pb-3">Mensaje más reciente</h2>
                            <Link className="font-semibold text-sm text-black">Ver todo</Link>
                        </div>
                        <div className="flex flex-col gap-2 pt-6 text-[#000000]">
                            <ol className="relative border-1 border-slate-600 ml-4">
                                {recentMessage.map((m, i) => (
                                    <li className="mb-3 ml-6" key={i}>
                                        <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                                            <img
                                                className="w-full rounded-full h-full shadow-lg"
                                                src={
                                                    m.senderId === userInfo._id
                                                        ? userInfo.image
                                                        : customer
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="p-3 bg-green-700 rounded-lg border border-slate-600 shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <Link className="text-md font-normal">{m.senderName}</Link>
                                                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                                    {moment(m.createdAt).startOf('hour').fromNow()}
                                                </time>
                                            </div>
                                            <div className="p-2 text-xs font-normal bg-green-500 rounded-lg border border-slate-800">
                                                {m.message}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 bg-white rounded-md mt-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-black pb-3">Órdenes Recientes</h2>
                    
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-black">
                        <thead className="text-sm text-black uppercase border-b border-[#000000]">
                            <tr>
                                <th scope="col" className="py-3 px-4">
                                    ID
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Precio
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Estado de Pago
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Estado de la Orden
                                </th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((d, i) => (
                                <tr key={i}>
                                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                                        #{d._id}
                                    </td>
                                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                                        S/{d.price}
                                    </td>
                                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                                        <span>{statusMap[d.payment_status]}</span>
                                    </td>
                                    <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                                        <span>{statusMap[d.delivery_status]}</span>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
