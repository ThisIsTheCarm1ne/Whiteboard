import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PocketBase from 'pocketbase';
import { useInterval } from 'usehooks-ts';
import jwtDecode from 'jwt-decode';
import ms from 'ms';

const BASE_URL = 'http://127.0.0.1:8090';
const fiveMinutesInMs = ms('5 minutes');
const twoMinutesInMs = ms('2 minutes');

const PocketContext = createContext({});

interface taskObj {
  task: string,
  isDone: boolean
}
interface TODOObj{
  title: string,
  tasks: taskObj[],
  isDone: boolean,
}

export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const register = useCallback(async (username, login, password) => {
    return await pb
      .collection('users')
      .create({ username, login, password, passwordConfirm: password });
  }, []);

  const addTODO = useCallback(async (userId, title, tasks) => {
    return await pb
      .collection('TODOLists')
      .create({Owner: userId, Title: title, Tasks: tasks});
  }, []);

  const getTODOs = useCallback(async (userId) => {
    return pb.collection('TODOLists').getFullList({
      sort: '-created', filter: `Owner="${userId}"`
    }).then((res) => res);
  }, []);

  const getSingleTODO = useCallback(async (todoId) => {
    return pb.collection('TODOLists').getOne(todoId, {
      expand: 'Owner',
    }).then((res) => res);
  }, []);

  const removeSingleTODO = useCallback(async (todoId) => {
    return pb.collection('TODOLists').delete(todoId);
  }, []);

  const updTODO = useCallback(async (TODOData: TODOObj) => {
    return pb.collection('TODOLists').update(TODOData.id, TODOData)
    .then((res) => res);
  }, []);

  const login = useCallback(async (login, password) => {
    return await pb.collection('users').authWithPassword(login, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection('users').authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, user, addTODO, getTODOs, updTODO, token, pb, getSingleTODO, removeSingleTODO }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
