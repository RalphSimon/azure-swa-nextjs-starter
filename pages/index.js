import { useEffect, useState } from 'react'

import SmallCard from '../components/SmallCard'
import { projectIcons } from '../components/Icons'

import { projects } from '../utils/projectsData'

const Home = () => {
	const [message, setMessage] = useState('')
	const [response, setResponse] = useState('')

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:7071/api/hello', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify({
					name: message,
				}),
			})
			const data = await response.text()

			setResponse(data)
		} catch (error) {
			console.error('Error fetching hello api =>', error)
		}
	}

	return (
		<div className="home">
			<h1>What Can I Deploy to Static Apps?</h1>
			<div className="card-grid">
				{projects.map((project) => {
					const Icon = projectIcons[project.id]
					return (
						<SmallCard
							key={project.id}
							Icon={Icon}
							title={project.name}
							slug={project.slug}
						/>
					)
				})}
			</div>
			<div
				style={{
					marginTop: '24px',
				}}>
				<label
					htmlFor="message"
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<span>Enter a message:</span>
					<input
						id="message"
						value={message}
						onChange={(e) => {
							setMessage(e.currentTarget.value)
						}}
					/>
				</label>
				<button
					onClick={() => {
						fetchData()
					}}
					style={{
						marginTop: '24px',
					}}>
					Fetch Message
				</button>
			</div>
			<div
				style={{
					marginTop: '24px',
					fontSize: '2em',
				}}>
				Response
			</div>
			<div
				style={{
					marginTop: '24px',
					fontSize: '2em',
				}}>
				{response}
			</div>
		</div>
	)
}

export default Home
