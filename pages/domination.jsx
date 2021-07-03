import { observer } from 'mobx-react-lite';
import { 
	Grid, Panel, Players, 
	FooterPanel, Actions, Timer 
} from '../components/domination';
import { Info, Content, Separator, Warning, Main } from '../components/Styled';
import { declText } from '../utils';
import { Icon } from '../components/default';
import { useStore } from '../providers/Store';

const Domination = observer(({ title }) => {
	const domination = useStore();
	const { id, players } = domination;

	return (
		<Main>
			{ domination ? 
			<>
				<Info>
					<div className='title'>{title}<Separator />{`Игра #${id}`}</div>
					<div>{`${players.length} ${declText(players.length, 'участников', 'участник', 'участника')}`}</div>
				</Info>
				<Content>
					<Players />
					<Timer />
					<Panel />
					<Grid />
					<FooterPanel />
					<Actions />
				</Content>
			</> :
			<Warning>
				<Icon src='warning' width={64} />
				<p>Ошибка загрузки игры</p>
			</Warning> }
		</Main>
	);
});

const getStaticProps = async () => {
	const props = {
		title: 'Доминация'
	}

	return { props }
}

export default Domination;
export { getStaticProps };