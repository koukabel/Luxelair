import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";

interface props {
	description: string;
	equipements: []
}
const Toggle: React.FC<props> = ({ description, equipements }) => {
	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Description
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>{description}</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Equipements
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
  {equipements.map((equipement: string, index: number) => (
    <li key={index}>{equipement}</li>
  ))}
</AccordionPanel>

			</AccordionItem>
		</Accordion>
	);
};

export default Toggle;
