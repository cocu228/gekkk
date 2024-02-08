import {useState} from 'preact/compat';

const TabContainer = ({ children }) => {
	const [activeTab, setActiveTab] = useState(children[0].props.label);
	
	return (
		<div>
			<div>
				{children.map((child) => {
					const { label } = child.props;
					
					return (
						<button
							onClick={() => setActiveTab(label)}
							key={label}
						>
							{label}
						</button>
					);
				})}
			</div>
			
			{children.map((child) => {
				if (child.props.label !== activeTab) return undefined;
				return child.props.children;
			})}
		</div>
	);
};

// Использование:
// <Tabs>
//   <Tab label="Вкладка 1">Содержимое вкладки 1</Tab>
//   <Tab label="Вкладка 2">Содержимое вкладки 2</Tab>
// </Tabs>

export default TabContainer;
