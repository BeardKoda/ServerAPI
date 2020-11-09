import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchModalView from './searchModal'; 
import formService from './form.service';
import Swal from "sweetalert2";

// const datas= [{
// 	txId: "sdfdsafsafasfas",
// 	sender: {name:"Ademola Rasheed"},
// 	reciever: {name:"Mutita Lovety"},
// 	amount: 2,
// 	currency: 'USDT',
// 	rate: 200,
// 	recieved_currency: 'NGN',
// },{
// 	txId: "sgfhgfdsrtytf",
// 	sender: {name:"Molafudho Olowu"},
// 	reciever: {name:"Bunimi adebola"},
// 	amount: 120,
// 	currency: 'USDT',
// 	rate: 400,
// 	recieved_currency: 'NGN',
// }]

const Search = () =>{
	const [show, setShow] = useState(false);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [datas, setDatas] = useState([]);
	const [apiKey, setApiKey] = useState('');
	const [search, setSearch] = useState(null);

	useEffect(()=>{
	}, [])

	const setView = async (values) => {
		setData(values)
		setShow(true);
		console.log(values, data);
	}
	const resetForm = async () => {
		setData({});
		setShow(false);
	}
	const fechTrans = async () =>{
		if(apiKey){
			formService.getTransactions(apiKey, search).then((res)=>{
				setDatas(res.data.data);
				setLoading(false);
			}).catch((err)=>{
				let msg = err.response;
				console.log(msg.data.message);
				AlertResp({title:'Error Occurred', text:msg.data.message, icon:'error', confirmButtonText:'Try Again'});
			});
		}else{
			AlertResp({title:'API KEY required', text:"APi key is required to fetch transactions", icon:'error', confirmButtonText:'Try Again'})
		}
	}
	console.log(data, apiKey, search);

	return (
		<div className={'container m-4'}>
			<div className="row">
				<div className="input-group input-group-md mb-3">
					<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={apiKey} onChange={(e)=>setApiKey(e.target.value)} />
					<div className="input-group-append">
						<button className="btn btn-primary input-group-text" id="inputGroup-sizing-sm" onClick={()=>fechTrans()}> Set APIKEY </button>
					</div>
				</div>
				{apiKey && 
					<div className="input-group input-group-md mb-3">
						<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={search} onChange={(e)=>setSearch(e.target.value)} />
						<div className="input-group-append">
							<button className="btn btn-secondary input-group-text" id="inputGroup-sizing-sm" onClick={()=>fechTrans()}> Search </button>
						</div>
					</div>
				}
				</div>
			{apiKey && 
				<>
					<div className="row mt-5">
						<h4 className={'title'}>Recent Recieved Transactions</h4>
					</div>
					<div className="row justify-content-center">
						<table className="table table-hover">
							<tbody>
								{!loading && datas.map((da, i)=>{
									return(
										<tr onClick={()=>setView(da)} key={i}>
											<td>{da.txId}</td>
											<td><small>{da.uniTxId}</small></td>
											<td>{da.sender.name}</td>
											<td>{da.reciever.name}</td>
											<td>{da.amount} {da.sendingCurrency}</td>
											<td>{da.amount * da.rate} {da.recieved_currency}</td>
											<td><small>{da.status}</small></td>
										</tr>
									)})
								}
								{!loading && datas.length==0 && <tr>
									No data found
									</tr>}
								{loading && <tr>
									Loading....
									</tr>}
							</tbody>
						</table>
					</div>
				</>
			}
			{/* <div className="row justify-content-center">
			</div> */}

      <SearchModalView
        show={show}
        setShow={setShow}
        data={data}
        Proceed={'ProceedPayment'}
        resetForm={resetForm}
        formData={'formData'}
      />
		</div>
	)
}

const AlertResp = (props) =>{
  const {title, text, icon, confirmButtonText } = props;
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
}

export default Search;