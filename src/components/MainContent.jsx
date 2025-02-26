// src/components/MainContent.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

const brands = [
	{ value: '', label: 'Выберите...' },
	{ value: '057', label: 'Acura' },
	{ value: '040', label: 'Alfa Romeo' },
	{ value: '070', label: 'Astonmartin' },
	{ value: '011', label: 'Audi' },
	{ value: '086', label: 'Baic Yinxiang' },
	{ value: '050', label: 'Bentley' },
	{ value: '012', label: 'BMW' },
	{ value: '077', label: 'Bugatti' },
	{ value: '045', label: 'Buick' },
	{ value: '090', label: 'BYD' },
	{ value: '043', label: 'Cadillac' },
	{ value: '038', label: 'Chevrolet' },
	{ value: '003', label: 'ChevroletGMDaewoo' },
	{ value: '023', label: 'Chrysler' },
	{ value: '022', label: 'Citroen-DS' },
	{ value: '051', label: 'Daihatsu' },
	{ value: '088', label: 'DFSK' },
	{ value: '034', label: 'Dodge' },
	{ value: '041', label: 'Ferrari' },
	{ value: '018', label: 'Fiat' },
	{ value: '024', label: 'Ford' },
	{ value: '007', label: 'Genesis' },
	{ value: '056', label: 'GMC' },
	{ value: '027', label: 'Honda' },
	{ value: '048', label: 'Hummer' },
	{ value: '001', label: 'Hyundai' },
	{ value: '058', label: 'Infiniti' },
	{ value: '028', label: 'Isuzu' },
	{ value: '019', label: 'Jaguar' },
	{ value: '083', label: 'Jeep' },
	{ value: '004', label: 'KG_Mobility_Ssangyong' },
	{ value: '002', label: 'Kia' },
	{ value: '049', label: 'Lamborghini' },
	{ value: '020', label: 'Land Rover' },
	{ value: '035', label: 'Lexus' },
	{ value: '044', label: 'Lincoln' },
	{ value: '053', label: 'Maserati' },
	{ value: '029', label: 'Mazda' },
	{ value: '084', label: 'Mclaren' },
	{ value: '013', label: 'Mercedes-Benz' },
	{ value: '030', label: 'Mitsubishi' },
	{ value: '033', label: 'Nissan' },
	{ value: '015', label: 'Porsche' },
	{ value: '078', label: 'Renault' },
	{ value: '005', label: 'Renault-KoreaSamsung' },
	{ value: '047', label: 'Rolls-Royce' },
	{ value: '016', label: 'Saab' },
	{ value: '052', label: 'Subaru' },
	{ value: '037', label: 'Suzuki' },
	{ value: '087', label: 'Tesla' },
	{ value: '031', label: 'Toyota' },
	{ value: '014', label: 'Volkswagen' },
	{ value: '017', label: 'Volvo' },
]

const MainContent = () => {
	const [series, setSeries] = useState([])
	const [loadingSeries, setLoadingSeries] = useState(false)

	const [formData, setFormData] = useState({
		manufacturer: '',
		model: '',
		series: '',
	})

	const [models, setModels] = useState([])
	const [loadingModels, setLoadingModels] = useState(false)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleManufacturerChange = async (e) => {
		const selectedManufacturer = e.target.value
		setFormData({ ...formData, manufacturer: selectedManufacturer, model: '' })
		setLoadingModels(true)

		if (selectedManufacturer) {
			try {
				const response = await axios.get(
					`https://corsproxy.io/?key=28174bc7&url=https://4229661-cc14805.twc1.net/filter?manufacturer=${selectedManufacturer}`,
				)

				if (response.data && response.data.models) {
					const modelsData = response.data.models.map((model) => ({
						value: model.Code,
						label: model.NameRU,
					}))
					setModels(modelsData)
				} else {
					setModels([])
				}
			} catch (error) {
				console.error('Ошибка при загрузке моделей:', error)
				setModels([])
			}
		} else {
			setModels([])
		}
		setLoadingModels(false)
	}

	const handleModelChange = async (e) => {
		const selectedModel = e.target.value
		setFormData({ ...formData, model: selectedModel, series: '' })
		setLoadingSeries(true)

		if (formData.manufacturer && selectedModel) {
			try {
				const response = await axios.get(
					`https://api.codetabs.com/v1/proxy?quest=https://4229661-cc14805.twc1.net/filter?manufacturer=${formData.manufacturer}&model=${selectedModel}`,
				)

				console.log(response.data)

				if (response.data && response.data.grades) {
					const seriesData = response.data.grades.map((grade) => ({
						value: grade.Code,
						label: grade.NameEN || grade.Name || 'Без названия',
					}))
					setSeries(seriesData)
				} else {
					setSeries([])
				}
			} catch (error) {
				console.error('Ошибка при загрузке серий:', error)
				setSeries([])
			}
		} else {
			setSeries([])
		}
		setLoadingSeries(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		alert('Форма отправлена!')
	}

	console.log(series)

	return (
		<main className='bg-white min-h-screen flex justify-center items-center p-4'>
			<form
				className='bg-white shadow-md rounded-lg p-6 w-full max-w-3xl space-y-4'
				onSubmit={handleSubmit}
			>
				<h2 className='text-2xl font-bold text-[#F04A23]'>Подбор авто</h2>

				<div>
					<label className='block text-gray-700'>Производитель *</label>
					<select
						className='form-select w-full border border-gray-300 rounded-md p-2'
						name='manufacturer'
						value={formData.manufacturer}
						onChange={handleManufacturerChange}
						required
					>
						{brands.map((brand) => (
							<option key={brand.value} value={brand.value}>
								{brand.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className='block text-gray-700'>Модель *</label>
					{loadingModels ? (
						<p className='text-[#F04A23]'>Загрузка моделей...</p>
					) : (
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='model'
							value={formData.model}
							onChange={handleModelChange}
							required
							disabled={models.length === 0}
						>
							<option value=''>Выберите...</option>
							{models.map((model, index) => (
								<option key={index} value={model.value}>
									{model.label}
								</option>
							))}
						</select>
					)}
				</div>

				<div>
					<label className='block text-gray-700'>Серия (необязательно)</label>
					{loadingSeries ? (
						<p className='text-[#F04A23]'>Загрузка серий...</p>
					) : (
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='series'
							value={formData.series}
							onChange={handleChange}
							disabled={series.length === 0}
						>
							<option value=''>Выберите...</option>
							{series.map((serie, index) => (
								<option key={index} value={serie.value}>
									{serie.label}
								</option>
							))}
						</select>
					)}
				</div>

				<button
					type='submit'
					className='bg-[#F04A23] text-white py-2 px-6 rounded-full shadow-md hover:bg-[#d93e1c] transition duration-300'
				>
					Сохранить
				</button>
			</form>
		</main>
	)
}

export default MainContent
