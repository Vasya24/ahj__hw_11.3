import { Subject } from 'rxjs';
import {
  startWith, scan, share, pluck, distinctUntilChanged,
} from 'rxjs/operators';
import Projects from './Projects';
import Tasks from './Tasks';

const data = {
  projects: [
    {
      id: 1,
      name: 'REST Backend',
      tasks: [
        {
          id: 13,
          name: 'REST Server',
          done: false,
        },
        {
          id: 14,
          name: 'SSE Server',
          done: false,
        },
        {
          id: 15,
          name: 'Websockets',
          done: false,
        },
        {
          id: 16,
          name: 'KOA',
          done: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Frontend',
      tasks: [
        {
          id: 17,
          name: 'Learn React',
          done: false,
        },
        {
          id: 18,
          name: 'Create Valid form for Credit Card',
          done: false,
        },
        {
          id: 19,
          name: 'Write Chat on Javascript',
          done: false,
        },
        {
          id: 20,
          name: 'Add API for backend',
          done: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Android App',
      tasks: [
        {
          id: 21,
          name: 'Android Pay Support',
          done: false,
        },
        {
          id: 22,
          name: 'GoogleMarket Publication',
          done: false,
        },
        {
          id: 23,
          name: 'Kotlin',
          done: false,
        },
        {
          id: 24,
          name: 'Architecture components',
          done: false,
        },
      ],
    },
    {
      id: 4,
      name: 'iOS App',
      tasks: [
        {
          id: 25,
          name: 'Push Notifications',
          done: false,
        },
        {
          id: 26,
          name: 'Apple Pay Support',
          done: false,
        },
        {
          id: 27,
          name: '|18n',
          done: false,
        },
        {
          id: 28,
          name: 'AppStore Publication',
          done: false,
        },
      ],
    },
  ],
};

const projects = new Projects(data.projects);
projects.init();
const tasks = new Tasks(data.projects);
tasks.init();

const Actions = {
  Increment: 'INCREMENT',
  Decrement: 'DECREMENT',
  Reset: 'RESET',
};

const storeArr = [];

function reduce(state, action) {
  switch (action.type) {
    case Actions.Increment:
      return { ...state, counter: state.counter + action.payload };
    case Actions.Decrement:
      return { ...state, counter: state.counter - action.payload };
    case Actions.Reset:
      return { ...state, counter: 0 };
    default:
      return state;
  }
}

class Store {
  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: '__INITIALIZATION__' }),
      scan((state, action) => reduce(state, action), { counter: 0 }),
      share(),
    );
  }

  dispatch(type, payload = null) {
    this.actions$.next({ type, payload });
  }

  inc(value = null) {
    this.dispatch(Actions.Increment, value);
  }

  dec(value = null) {
    this.dispatch(Actions.Decrement, value);
  }

  reset() {
    this.dispatch(Actions.Reset);
  }
}

for (const item of data.projects) {
  storeArr[item.id] = new Store();
  storeArr[item.id].state$
    .pipe(
      pluck('counter'),
      distinctUntilChanged(),
    )
    .subscribe((value) => {
      document.querySelector(`[data-id='${item.id}']`).querySelector('.project-open-counter').innerText = value;
    });
}

tasks.container.addEventListener('click', (event) => {
  if (document.querySelector('.modal-active')) return;
  if (event.target.classList.contains('task-status')) {
    const target = event.target.closest('.task-item');
    const { id } = target.dataset;
    const projectIndex = data.projects.findIndex((el) => el.name === document.querySelector('.task-header-value').innerText);
    const projectId = data.projects[projectIndex].id;
    const indexTask = data.projects[projectIndex].tasks.findIndex((el) => el.id === Number(id));
    if (target.classList.contains('task-done')) {
      storeArr[projectId].dec(1);
      target.classList.remove('task-done');
      data.projects[projectIndex].tasks[indexTask].done = false;
    } else {
      storeArr[projectId].inc(1);
      target.classList.add('task-done');
      data.projects[projectIndex].tasks[indexTask].done = true;
    }
  }
});
