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

const mileageOptions = [
	{ value: '', label: '-' },
	{ value: '0', label: '0 км' },
	{ value: '10000', label: '10 000 км' },
	{ value: '20000', label: '20 000 км' },
	{ value: '30000', label: '30 000 км' },
	{ value: '40000', label: '40 000 км' },
	{ value: '50000', label: '50 000 км' },
	{ value: '60000', label: '60 000 км' },
	{ value: '70000', label: '70 000 км' },
	{ value: '80000', label: '80 000 км' },
	{ value: '90000', label: '90 000 км' },
	{ value: '100000', label: '100 000 км' },
	{ value: '110000', label: '110 000 км' },
	{ value: '120000', label: '120 000 км' },
	{ value: '130000', label: '130 000 км' },
	{ value: '140000', label: '140 000 км' },
	{ value: '150000', label: '150 000 км' },
	{ value: '160000', label: '160 000 км' },
	{ value: '170000', label: '170 000 км' },
	{ value: '180000', label: '180 000 км' },
	{ value: '190000', label: '190 000 км' },
	{ value: '200000', label: '200 000 км' },
]

const priceOptions = [
	{ value: '0', label: '-' },
	{ value: '1000', label: '1 000 000' },
	{ value: '2000', label: '2 000 000' },
	{ value: '3000', label: '3 000 000' },
	{ value: '4000', label: '4 000 000' },
	{ value: '5000', label: '5 000 000' },
	{ value: '6000', label: '6 000 000' },
	{ value: '7000', label: '7 000 000' },
	{ value: '8000', label: '8 000 000' },
	{ value: '9000', label: '9 000 000' },
	{ value: '10000', label: '10 000 000' },
	{ value: '11000', label: '11 000 000' },
	{ value: '12000', label: '12 000 000' },
	{ value: '13000', label: '13 000 000' },
	{ value: '14000', label: '14 000 000' },
	{ value: '15000', label: '15 000 000' },
	{ value: '16000', label: '16 000 000' },
	{ value: '17000', label: '17 000 000' },
	{ value: '18000', label: '18 000 000' },
	{ value: '19000', label: '19 000 000' },
	{ value: '20000', label: '20 000 000' },
	{ value: '30000', label: '30 000 000' },
	{ value: '40000', label: '40 000 000' },
	{ value: '50000', label: '50 000 000' },
	{ value: '60000', label: '60 000 000' },
	{ value: '70000', label: '70 000 000' },
	{ value: '80000', label: '80 000 000' },
	{ value: '90000', label: '90 000 000' },
	{ value: '100000', label: '100 000 000' },
]

const yearOptions = [
	{ value: '202501', label: '2025' },
	{ value: '202401', label: '2024' },
	{ value: '202301', label: '2023' },
	{ value: '202201', label: '2022' },
	{ value: '202101', label: '2021' },
	{ value: '202001', label: '2020' },
	{ value: '201901', label: '2019' },
	{ value: '201801', label: '2018' },
	{ value: '201701', label: '2017' },
	{ value: '201601', label: '2016' },
	{ value: '201501', label: '2015' },
	{ value: '201401', label: '2014' },
	{ value: '201301', label: '2013' },
	{ value: '201201', label: '2012' },
	{ value: '201101', label: '2011' },
	{ value: '201001', label: '2010' },
	{ value: '200901', label: '2009' },
	{ value: '200801', label: '2008' },
	{ value: '200701', label: '2007' },
	{ value: '200601', label: '2006' },
	{ value: '200501', label: '2005' },
	{ value: '200401', label: '2004' },
	{ value: '200301', label: '2003' },
	{ value: '200201', label: '2002' },
	{ value: '200101', label: '2001' },
	{ value: '200001', label: '2000' },
	{ value: '199901', label: '1999' },
	{ value: '199801', label: '1998' },
	{ value: '199701', label: '1997' },
	{ value: '199601', label: '1996' },
	{ value: '199501', label: '1995' },
	{ value: '199401', label: '1994' },
	{ value: '199301', label: '1993' },
	{ value: '199201', label: '1992' },
	{ value: '199101', label: '1991' },
	{ value: '199001', label: '1990' },
	{ value: '198901', label: '1989' },
	{ value: '198801', label: '1988' },
	{ value: '198701', label: '1987' },
	{ value: '198601', label: '1986' },
	{ value: '198501', label: '1985' },
	{ value: '198401', label: '1984' },
	{ value: '198301', label: '1983' },
	{ value: '198201', label: '1982' },
	{ value: '198101', label: '1981' },
]

const MainContent = () => {
	const [series, setSeries] = useState([])
	const [loadingSeries, setLoadingSeries] = useState(false)
	const [minMileageTo, setMinMileageTo] = useState('')
	const [maxMileageFrom, setMaxMileageFrom] = useState('')
	const [minPriceTo, setMinPriceTo] = useState('')
	const [maxPriceFrom, setMaxPriceFrom] = useState('')
	const [minYearTo, setMinYearTo] = useState('')
	const [maxYearFrom, setMaxYearFrom] = useState('')

	const [formData, setFormData] = useState({
		manufacturer: '',
		model: '',
		series: '',
		mileage_from: '',
		mileage_to: '',
		price_from: '',
		price_to: '',
		year_from: '',
		year_to: '',
	})

	const [models, setModels] = useState([])
	const [loadingModels, setLoadingModels] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData({ ...formData, [name]: value })

		// Логика зависимости пробега
		if (name === 'mileage_from') {
			setMinMileageTo(value) // Минимальное значение для "до"
		}

		if (name === 'mileage_to') {
			setMaxMileageFrom(value) // Максимальное значение для "от"
		}

		// Логика зависимости цены
		if (name === 'price_from') {
			setMinPriceTo(value) // Минимальное значение для "до"
		}

		if (name === 'price_to') {
			setMaxPriceFrom(value) // Максимальное значение для "от"
		}

		// Логика зависимости года
		if (name === 'year_from') {
			setMinYearTo(value) // Минимальное значение для "до"
		}

		if (name === 'year_to') {
			setMaxYearFrom(value) // Максимальное значение для "от"
		}
	}

	const handleManufacturerChange = async (e) => {
		const selectedManufacturer = e.target.value
		setFormData({ ...formData, manufacturer: selectedManufacturer, model: '' })
		setLoadingModels(true)

		if (selectedManufacturer) {
			try {
				const response = await axios.get(
					`https://corsproxy.io/${encodeURIComponent(
						`https://4229661-cc14805.twc1.net/filter?manufacturer=${selectedManufacturer}`,
					)}`,
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
					`https://corsproxy.io/${encodeURIComponent(
						`https://4229661-cc14805.twc1.net/filter?manufacturer=${formData.manufacturer}&model=${selectedModel}`,
					)}`,
				)

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

		console.log(formData)
	}

	return (
		<main className='bg-white min-h-screen mx-auto w-full p-4'>
			<form
				className='bg-white shadow-md rounded-lg p-6 w-full max-w-3xl space-y-4 mx-auto'
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

				<div className='flex space-x-4'>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Пробег от</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='mileage_from'
							value={formData.mileage_from}
							onChange={handleChange}
						>
							{mileageOptions
								.filter(
									(option) =>
										!maxMileageFrom ||
										parseInt(option.value) <= parseInt(maxMileageFrom),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Пробег до</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='mileage_to'
							value={formData.mileage_to}
							onChange={handleChange}
						>
							{mileageOptions
								.filter(
									(option) =>
										!minMileageTo ||
										parseInt(option.value) >= parseInt(minMileageTo),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className='flex space-x-4'>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Цена от</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='price_from'
							value={formData.price_from}
							onChange={handleChange}
						>
							{priceOptions
								.filter(
									(option) =>
										!maxPriceFrom ||
										parseInt(option.value) <= parseInt(maxPriceFrom),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Цена до</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='price_to'
							value={formData.price_to}
							onChange={handleChange}
						>
							{priceOptions
								.filter(
									(option) =>
										!minPriceTo ||
										parseInt(option.value) >= parseInt(minPriceTo),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className='flex space-x-4'>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Год от</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='year_from'
							value={formData.year_from}
							onChange={handleChange}
						>
							<option value=''>-</option>
							{yearOptions
								.filter(
									(option) =>
										!maxYearFrom ||
										parseInt(option.value) <= parseInt(maxYearFrom),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
					<div className='w-1/2'>
						<label className='block text-gray-700'>Год до</label>
						<select
							className='form-select w-full border border-gray-300 rounded-md p-2'
							name='year_to'
							value={formData.year_to}
							onChange={handleChange}
						>
							<option value=''>-</option>
							{yearOptions
								.filter(
									(option) =>
										!minYearTo || parseInt(option.value) >= parseInt(minYearTo),
								)
								.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
				</div>

				<button
					type='submit'
					className='bg-[#F04A23] text-white py-2 px-6 rounded-sm shadow-md hover:bg-[#d93e1c] transition duration-300 mx-auto block mt-10 w-full cursor-pointer'
				>
					Сохранить
				</button>
			</form>
		</main>
	)
}

export default MainContent
