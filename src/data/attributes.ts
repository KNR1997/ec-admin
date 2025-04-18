import Router, { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from './client/api-endpoints';
import { Attribute, AttributePaginator, AttributeQueryOptions, GetParams } from '@/types';
import { attributeClient } from '@/data/client/attribute';
import { Config } from '@/config';
import { STORE_OWNER, SUPER_ADMIN } from '@/utils/constants';
import { getAuthCredentials } from '@/utils/auth-utils';

export const useCreateAttributeMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(attributeClient.create, {
    onSuccess: () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.attribute.list}`
        : Routes.attribute.list;
      Router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });
      toast.success(t('common:successfully-created'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
    },
  });
};

export const useUpdateAttributeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(attributeClient.update, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
    },
  });
};

export const useDeleteAttributeMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(attributeClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
    },
  });
};

export const useAttributeQuery = ({ slug, language }: GetParams) => {
  return useQuery<Attribute, Error>(
    [API_ENDPOINTS.ATTRIBUTES, { slug, language }],
    () => attributeClient.get({ slug, language })
  );
};

export const useAttributesQuery = (
  params: Partial<AttributeQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<AttributePaginator, Error>(
    [API_ENDPOINTS.ATTRIBUTES, params],
    ({ queryKey, pageParam }) =>
      attributeClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    attributes: data?.data ?? [],
    error,
    loading: isLoading,
  };
};
