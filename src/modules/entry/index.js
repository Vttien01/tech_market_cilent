import { useCurrency } from '@components/common/elements/Currency';
import { storageKeys } from '@constants';
import useAuth from '@hooks/useAuth';
import useNotification from '@hooks/useNotification';
import routes from '@routes';
import { getData } from '@utils/localStorage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userKind = getData(storageKeys.kind);
    const { kind } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notification = useNotification();
    const { fetchCurrency } = useCurrency();

    // navigate(routes.loginPage.path);
    // if (userKind == UserTypes.ADMIN) {
    //     navigate(routes.studentListPage.path);
    // }

    useEffect(() => {
        if (kind == 3) {
            navigate(routes.HomePage.path);
        } else if (kind == 2) {
            navigate(routes.brandListPage.path);
        } else {
            navigate(routes.userListPage.path);
        }
    }, []);

    // return <img alt="not-found-background" src={notFoundImage} />;
    return null;
};

export default Dashboard;
