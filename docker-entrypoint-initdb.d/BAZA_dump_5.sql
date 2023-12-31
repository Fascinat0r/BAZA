PGDMP                         {            BAZA    15.3    15.2 4    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            >           1262    24945    BAZA    DATABASE     z   CREATE DATABASE "BAZA" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "BAZA";
                postgres    false            ?           0    0    DATABASE "BAZA"    COMMENT     R   COMMENT ON DATABASE "BAZA" IS 'База данных для проекта BAZA';
                   postgres    false    3390            �            1259    33144    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    postgres    false            �            1259    33150 	   component    TABLE     �   CREATE TABLE public.component (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    creator_id integer,
    date timestamp without time zone,
    data json NOT NULL,
    is_final boolean NOT NULL
);
    DROP TABLE public.component;
       public         heap    postgres    false            �            1259    33176    component_association    TABLE     �   CREATE TABLE public.component_association (
    parent_id integer NOT NULL,
    child_id integer NOT NULL,
    postfix character varying
);
 )   DROP TABLE public.component_association;
       public         heap    postgres    false            �            1259    33149    component_id_seq    SEQUENCE     �   CREATE SEQUENCE public.component_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.component_id_seq;
       public          postgres    false    216            @           0    0    component_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.component_id_seq OWNED BY public.component.id;
          public          postgres    false    215            �            1259    33159    material    TABLE     �   CREATE TABLE public.material (
    id integer NOT NULL,
    name character varying,
    manufacturer character varying,
    data json NOT NULL
);
    DROP TABLE public.material;
       public         heap    postgres    false            �            1259    33193    material_association    TABLE     r   CREATE TABLE public.material_association (
    component_id integer NOT NULL,
    material_id integer NOT NULL
);
 (   DROP TABLE public.material_association;
       public         heap    postgres    false            �            1259    33158    material_id_seq    SEQUENCE     �   CREATE SEQUENCE public.material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.material_id_seq;
       public          postgres    false    218            A           0    0    material_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.material_id_seq OWNED BY public.material.id;
          public          postgres    false    217            �            1259    33168    role    TABLE     v   CREATE TABLE public.role (
    role_id integer NOT NULL,
    name character varying NOT NULL,
    permissions json
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    33167    role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.role_id_seq;
       public          postgres    false    220            B           0    0    role_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.role_id_seq OWNED BY public.role.role_id;
          public          postgres    false    219            �            1259    33208    system    TABLE     ?   CREATE TABLE public.system (
    parent_id integer NOT NULL
);
    DROP TABLE public.system;
       public         heap    postgres    false            �            1259    33219    user    TABLE     k  CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    registered_at timestamp without time zone,
    role_id integer,
    email character varying(320) NOT NULL,
    hashed_password character varying(1024) NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    is_verified boolean NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    33218    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    225            C           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    224            �           2604    33153    component id    DEFAULT     l   ALTER TABLE ONLY public.component ALTER COLUMN id SET DEFAULT nextval('public.component_id_seq'::regclass);
 ;   ALTER TABLE public.component ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    33162    material id    DEFAULT     j   ALTER TABLE ONLY public.material ALTER COLUMN id SET DEFAULT nextval('public.material_id_seq'::regclass);
 :   ALTER TABLE public.material ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    33171    role role_id    DEFAULT     g   ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_id_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    33222    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            -          0    33144    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          postgres    false    214   2;       /          0    33150 	   component 
   TABLE DATA           \   COPY public.component (id, name, description, creator_id, date, data, is_final) FROM stdin;
    public          postgres    false    216   \;       4          0    33176    component_association 
   TABLE DATA           M   COPY public.component_association (parent_id, child_id, postfix) FROM stdin;
    public          postgres    false    221   �G       1          0    33159    material 
   TABLE DATA           @   COPY public.material (id, name, manufacturer, data) FROM stdin;
    public          postgres    false    218   �H       5          0    33193    material_association 
   TABLE DATA           I   COPY public.material_association (component_id, material_id) FROM stdin;
    public          postgres    false    222   �H       3          0    33168    role 
   TABLE DATA           :   COPY public.role (role_id, name, permissions) FROM stdin;
    public          postgres    false    220   
I       6          0    33208    system 
   TABLE DATA           +   COPY public.system (parent_id) FROM stdin;
    public          postgres    false    223   UI       8          0    33219    user 
   TABLE DATA           �   COPY public."user" (id, username, registered_at, role_id, email, hashed_password, is_active, is_superuser, is_verified) FROM stdin;
    public          postgres    false    225   uI       D           0    0    component_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.component_id_seq', 114, true);
          public          postgres    false    215            E           0    0    material_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.material_id_seq', 1, false);
          public          postgres    false    217            F           0    0    role_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.role_id_seq', 1, false);
          public          postgres    false    219            G           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 6, true);
          public          postgres    false    224            �           2606    33148 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            postgres    false    214            �           2606    33182 0   component_association component_association_pkey 
   CONSTRAINT        ALTER TABLE ONLY public.component_association
    ADD CONSTRAINT component_association_pkey PRIMARY KEY (parent_id, child_id);
 Z   ALTER TABLE ONLY public.component_association DROP CONSTRAINT component_association_pkey;
       public            postgres    false    221    221            �           2606    33157    component component_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.component DROP CONSTRAINT component_pkey;
       public            postgres    false    216            �           2606    33197 .   material_association material_association_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.material_association
    ADD CONSTRAINT material_association_pkey PRIMARY KEY (component_id, material_id);
 X   ALTER TABLE ONLY public.material_association DROP CONSTRAINT material_association_pkey;
       public            postgres    false    222    222            �           2606    33166    material material_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.material DROP CONSTRAINT material_pkey;
       public            postgres    false    218            �           2606    33175    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    220            �           2606    33212    system system_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.system
    ADD CONSTRAINT system_pkey PRIMARY KEY (parent_id);
 <   ALTER TABLE ONLY public.system DROP CONSTRAINT system_pkey;
       public            postgres    false    223            �           2606    33226    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    225            �           1259    33232    ix_user_email    INDEX     H   CREATE UNIQUE INDEX ix_user_email ON public."user" USING btree (email);
 !   DROP INDEX public.ix_user_email;
       public            postgres    false    225            �           2606    33183 9   component_association component_association_child_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.component_association
    ADD CONSTRAINT component_association_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.component(id);
 c   ALTER TABLE ONLY public.component_association DROP CONSTRAINT component_association_child_id_fkey;
       public          postgres    false    216    3211    221            �           2606    33188 :   component_association component_association_parent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.component_association
    ADD CONSTRAINT component_association_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.component(id);
 d   ALTER TABLE ONLY public.component_association DROP CONSTRAINT component_association_parent_id_fkey;
       public          postgres    false    3211    221    216            �           2606    33198 ;   material_association material_association_component_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.material_association
    ADD CONSTRAINT material_association_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id);
 e   ALTER TABLE ONLY public.material_association DROP CONSTRAINT material_association_component_id_fkey;
       public          postgres    false    3211    216    222            �           2606    33203 :   material_association material_association_material_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.material_association
    ADD CONSTRAINT material_association_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.material(id);
 d   ALTER TABLE ONLY public.material_association DROP CONSTRAINT material_association_material_id_fkey;
       public          postgres    false    3213    218    222            �           2606    33213    system system_parent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system
    ADD CONSTRAINT system_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.component(id);
 F   ALTER TABLE ONLY public.system DROP CONSTRAINT system_parent_id_fkey;
       public          postgres    false    3211    216    223            �           2606    33227    user user_role_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_role_id_fkey;
       public          postgres    false    225    220    3215            -      x�3L�4IJ12HI�4����� -
      /   O  x��[�n�������kY�&�2�'i��5h���]P���cOfjE�Ӥ�$(�KZmY�_�|����'n"��5�E"ų���ۋ��\$�qo�M�.~��x��%�^��xG��=��l�����sz5��%��$S�Z��rerN4B+9��t��Ή���Y�B� �S&G�~�Q��;�a�a�^���2�kN�?������+�����Šg�\����ѱ;�\�d89q݁?���K�wG#��Dd����[z�@�I4%Ջ����$��{����ܳVt}�T �lqy���x0Jʈ��f�f$6Y��I�nɖ�x�a��E;���g�lʐ_A���l�\�gi��8B$�hs�3��ќ����?Ag�����2rx�"Ȥ�=_�|�d�����oH���c-3q�F�2�tx�
�r$G����dE���yrMҜ��ϓA��!V�V�s2�V.
����Z_H��4XJ@��7�=���բ7Da��|^��R�r�/���pMδ��
zk�H�9O#�~�"l��k	��O�<d���R�XHTmE/�G*���!��H��+8{+/�.����t�ܙh.s�"f��=^��b���G�2�Zi!���1�޸�����3�g�B����ͺ��X�DlT_rZTՙ�8$Ѳ�1"�J�[VMi���@�\��P)�*���\B��h�kl��J�7�| c~���5J.���\��&�����=��v]�]o<N.\?h&��akD�MSF�Dt/����Q��T�(���ǈ�S���펃i)��l���J�9��i������9>Zd���`3�q[��ÿ��e܈H�{T���'����\������9ڈx�{O�A�9CʐT�s.��Q��z���S����b����r�Z��;$�I��d���F���ٍ��n<���/3_�,}B���	����c'�`��E���0�jA��c���_�] ?P^�5�����-%gFSq��b�In�:����^=�ToՐ��*5���T�)�K�j�46/dJ�U@u�t0�Y[���j��NE&^��
��%Q}��� ���+�VW�QnNa�d�ǆ6��m*�x@��N�T7��.>�I��g�yr[BG8B�N�kڞ�:'C��w#jV_����>u��Wα3�×����+w����ñ�phǻ�S^�b{��{���㒇7}�������+��c��t����w��e�ކ�Vό���RC�}�8DU f����ݗ2�6H�%�6'��(�xA.���3�x�Qt�)�C�l�|��8zT��s�+�G����X%s~o������E����*ۈѥ�Jm�׆CrH`!vt=	y�7���zeL����e��j� ��@5����;7Ԕ��ri�[�����aySmKow��&[�2 F-D����N'�H3�Se�,�ਭ2Ƚ����dF�X���waIjs}F��"�D����,�w,6�"�وX�(��eiG�ؠ�#����*Q�X^���U-J��E%x�tj1�\BD9@/��e'�ϓ�o�*�A3V���;Kߧ=�	�F�����KuZ�ӆ̝[�.����r�S	������Z����R������@	���)M��(`)���q��f��֜�Om\�r��+��n��T��I
���l�<�I#'�+J�#���Z��S����hKdla0\T;=ív�r%�{��DxPN�
f����n��w%=�:�5�]*YacŬA�~��=���E��Kڄfq�����U �H[��}�+���m��_W�P��{��<��!B�HxT�$�Y �Ƥ;Ly�i��;��؛��K�s���PA�D���m:9��#fhD�&�&�C`p���&��-+ku$+X��)f���O����󜻙
,���tX��y{�P�Ժ��<M��|�v���>q�2`@�j.P0u.$�MK�	dmZ8�QCX�;2�T�l%K��٥z��YՈї�Yh}�K�����-�c��k9��C�-Wnp�O(��/��u2p�Uw3��,ʎ�c 4¾��26��5N> ���1)���5������Ty}"��ڞ�P�r|�>�.���=J�kށ��%<�od��)�1�:S�4.��z�(AP�ݞ�sD��d"(��V�g<��d�9�;�0�C�7�!��(r�����/��)�J偘*��1,z���)�L��D2UP��Io[J���㎙;�׬��#���l��W�X�,�bnx��XY����Ͼx�d��|�5�k���2�O�8l�!�#:�\@7�o�+��R���V����g�KI�9+%G$
�d� 6�,���Ԭnfԩ�5�J=yaB��Mc�*�'D�,�+�* ��XnQke��B�Hn}�A�Ӫ_,x�@�-��ޜ+ت6[����\3�D��f����.D G"d�n�:�B�un�X�j��6�5��=��珲��P�{����#OV��O�H���H�����E���d��db��2�2��c�pN�8��e��/���}�)n��\{0k�zZ��9x���������b}��%G�
q)'�aw�W}cH�����z��J��==�'��*��
A��M0��C̷]�F�����dc܎V�[T��*�y�j�cw����&�А��F��[�ު��|�"�A��vI�ػ嫇�ab���L��1۟���a)���5@�W�qL�M��/��[�[�f/�ٛ͞����n��C2l��O0>$�I��Y�2l�dS09 ��k��F���h]<�1��iclBD(���~^ ���0x�?�bi &�0~D�Y�8U�(��r��K�Mo������3���6?$���臟�M�l�x��a<���� �[x`�b~p�ɐ�L�4G�	�����	��n{�|ݍ���c�m<�Hٷ�O�{��|��Mݎ_q���plw�-�w�.1t�E���{��>��-��I5ml����A|.M��ձ'����HEǱ�$����qgOꔗ-��p�=ɷ)���u��f6bӴ2<����� :���!Wl��︌�_�~}ʨ�C:)o��X�0��c���B�j`�y��t������lptt�A�"�      4   �   x�5��!C�L1�D���`��cHN�<g�����>{�6�)8⓰��MpB��4����!�*V��f�"a���64��52tTg(�cv|,�R�n6��Wv��0uΖ��r3��q>Ѐޮ�j�֤]�1e���fҋy.V�f�����5с�r�N��wD���d��p����~��y���Q�      1   P   x�3�0�¾�/츰��֋�^쾰S��,�������;.6���\� �������nC�ˀ�⬮����� ��1�      5      x�3�4�2�1z\\\ ��      3   ;   x�3�,�K,-��/ʬJM���2�,.HM.I,�/q�8SS2�lc�Ĕ��<3F��� c�      6      x�35����� 
      8   3  x�E�Kr�0 ��u8���!��X�X)>�j�c�n
B��ޣw���)�j�.����-+c`�I��-�Y3�]YQT`��,N`Q�6�m���ˢ�k�����<Ykh��`��DE���|n+��,�]�S
J�PR@�ٜ������|]i�#�?�QH���r�7U�6������/�.�}M�Z13��P��n��Y�Z�\�c���l�����w�a~�(%
&޿�mab�]�PMQ��[C�f-g��PQ�t'�.��(0���^�sk}�FB�ף���(���
��+�$��_l�     