export default function Loading() {
	return (
		<div className="container max-w-2xl mx-auto px-4 py-6">
			<h1 className="text-xl font-bold mb-4 animate-pulse bg-gray-300 rounded w-1/2 h-6"></h1>
			<ul className="space-y-6">
				{Array.from({ length: 10 }).map((_, i) => (
					<li key={i} className="border-b pb-4 animate-pulse">
						<div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
						<div className="flex space-x-2 text-sm text-gray-500">
							<div className="h-3 w-20 bg-gray-200 rounded"></div>
							<div className="h-3 w-16 bg-gray-200 rounded"></div>
							<div className="h-3 w-24 bg-gray-200 rounded"></div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
