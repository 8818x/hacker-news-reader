interface LayoutProps {
	children: React.ReactNode;
}

export default function StoryLayout({ children }: LayoutProps) {
	return <div>{children}</div>;
}
